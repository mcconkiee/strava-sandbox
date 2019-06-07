import { GarminBuilder, buildGPX } from 'gpx-builder';
import * as FormData from 'form-data';
import { requestConfig, RequestOptions } from '../util/api';
import axios, { AxiosRequestConfig } from 'axios';
import { Metadata } from 'gpx-builder/dist/builder/BaseBuilder/models';
const { Point } = GarminBuilder.MODELS;
const moment = require('moment');
const fs = require('fs');


export interface FileMade { file: string; data: string; }

interface ActivityStreamTime {
    data: number[];
}
interface ActivityStreamAlt {
    data: number[];
}
interface ActivityStreamLatLng {
    data: any[];
}


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
            const endResult = { file: filepath, data: data };
            res(endResult)
        });

    })
}

const uploadToStrava = (fileMade: FileMade, activity: any, token: string) => {
    
    // Create form
    const form = new FormData();
    form.append('file', fs.createReadStream(fileMade.file, "utf8"));
    form.append("data_type", "gpx");
    form.append("activity_type", activity.type);

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

const cleanup = (fileMade: FileMade) => {
    fs.unlink(fileMade.file)
    return true;
}
export default {
    serialize: serializeData,
    build: buildFile,
    upload: uploadToStrava,
    clean: cleanup
};
