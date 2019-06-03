import { Response, Request } from 'express';
import * as FormData from 'form-data';
import api, { requestConfig, RequestOptions } from '../util/api';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { GarminBuilder, buildGPX } from 'gpx-builder';
import { Metadata } from 'gpx-builder/dist/builder/BaseBuilder/models';

const fs = require('fs');
const moment = require('moment');
const { Point } = GarminBuilder.MODELS;

interface ActivityStreamTime {
    data: number[];
}
interface ActivityStreamAlt {
    data: number[];
}
interface ActivityStreamLatLng {
    data: any[];
}

interface FileMade { file: string; data: string; }

const serializeData = (data: object[], activity: any): Promise<object[]> => {
    return new Promise((res) => {
        const time: ActivityStreamTime = data.find((o: any) => o["type"] === "time") as ActivityStreamTime;
        const altitude: ActivityStreamAlt = data.find((o: any) => o["type"] === "altitude") as ActivityStreamAlt;
        const latlng: ActivityStreamLatLng = data.find((o: any) => o["type"] === "latlng") as ActivityStreamLatLng;

        const gpxData = time.data.map((item, index: number) => {
            const _latlng = latlng.data[index];
            return new Point(_latlng[0], _latlng[1], {
                ele: altitude.data[index],
                time: moment(activity.start_date).add(item, 'second').toDate(),
            })
        })
        res(gpxData);
    })
}

const buildFile = (points: any[], activity: any): Promise<FileMade> => {
    const gpxData = new GarminBuilder();
    gpxData.setSegmentPoints(points);
    const meta: Metadata = new Metadata({ name: activity.name, })
    gpxData.setMetadata(meta);
    const data = buildGPX(gpxData.toObject());
    return new Promise((res, rej) => {
        const filepath = `/tmp/${activity.id}.gpx`
        fs.writeFile(filepath, data, function (err: Error) {
            if (err) {
                rej(err)
                return;
            }
            res({ file: filepath, data: data })
        });

    })
}
const uploadToStrava = (fileMade: FileMade, activity: any, token: string) => {
    
    // Create form
    const form = new FormData();
    form.append('file', fs.createReadStream(fileMade.file,"utf8"));
    form.append("data_type", "gpx");    

    // use the form header for content type
    const formHeaders = form.getHeaders();
    const configOptions: RequestOptions = {
        access_token: token,
        contentType: formHeaders['content-type']
    }

    //setup config
    const config: AxiosRequestConfig = requestConfig(configOptions);
    config.url = "/uploads"
    config.method = "POST";
    
    return axios.post('/uploads', form, config);
}

// TODO - handle error later...
const cleanup = (fileMade:FileMade) => {
    fs.unlink(fileMade.file,()=>{})
    return true;
}
const getActivity = (activity: any, token: string) => {
    return api.get(`/activities/${activity.id}/streams/latlng,altitude,time`, { access_token: token })
}

module.exports = (req: Request, res: Response) => {
    const activity = req.body.activity;
    const accessToken: string = req.body.t;
    const dogAccessToken: string = req.body.d;

    getActivity(activity, accessToken).then((data: AxiosResponse) => {        
        return serializeData(data.data, activity);
    }).then((points: object[]) => {
        return buildFile(points, activity);
    }).then((data: FileMade) => {
        return Promise.all([data,uploadToStrava(data, activity, dogAccessToken)]);
    }).then(([fileMade,fromStravaResponse]) => {
        return Promise.all([cleanup(fileMade), fromStravaResponse]);
    }).then(([clean, fromStravaResponse]) => {                
        return res.send(fromStravaResponse.data);
    }).catch((error: Error) => {
        console.log('error on clone', error.message);
        console.log(error.stack);
        return res.status(500).send({ message: "There was an error processing the file.", error: error });
    });


}
