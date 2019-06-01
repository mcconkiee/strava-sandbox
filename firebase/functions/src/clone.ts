import { Response, Request } from 'express';
import api from './util/api';
import { AxiosResponse } from 'axios';
const fs = require('fs');
const { buildGPX, GarminBuilder } = require('gpx-builder');
const moment = require('moment');
const { Point } = GarminBuilder.MODELS;

interface ActivityStreamTime {
    data: number[]
}
interface ActivityStreamAlt {
    data: number[]
}
interface ActivityStreamLatLng {
    data: any[]
}

// interface ActivityStreamData {
//     time:ActivityStreamTime;
//     altitude: ActivityStreamAlt;
//     latlng: ActivityStreamLatLng;
// }


const serializeData = (data: object[], activity: any): Promise<object[]> => {
    return new Promise((res) => {
        const time: ActivityStreamTime = data.find((o:any) => o["type"] === "time") as ActivityStreamTime;
        const altitude: ActivityStreamAlt = data.find((o:any) => o["type"] === "altitude") as ActivityStreamAlt;
        const latlng: ActivityStreamLatLng = data.find((o:any) => o["type"] === "latlng") as ActivityStreamLatLng;        
        res(time.data.map((item, index: number) => {
            const _latlng = latlng.data[index];
            return new Point(_latlng[0], _latlng[1], {
                ele: altitude.data[index],
                time: moment(activity.start_date).add(item, 'second').toDate(),
            })
        }))
    })
}
const buildFile = (points: any[], activity: any): Promise<string> => {
    const gpxData = new GarminBuilder();
    gpxData.setSegmentPoints(points);
    console.log(buildGPX(gpxData.toObject()));
    return new Promise((res, rej) => {
        const filepath = `/tmp/${activity.id}.gpx`
        const stream = fs.createWriteStream(filepath);
        stream.once('open', function (err: Error) {
            if (err) {
                rej(err)
                return ;
            }
            stream.write(gpxData);
            stream.end();
            res(filepath)            
        });
    })
}
const getActivity = (activity: any, token: string) => {
    return api.get(`/activities/${activity.id}/streams/latlng,altitude,time`, { access_token: token })
}

module.exports = (req: Request, res: Response) => {
    const activity = req.params.activity;
    const accessToken: string = req.body.t;
    const dogAccessToken: string = req.body.d;

    getActivity(activity, accessToken).then((data: AxiosResponse) => {
        return serializeData(data.data, activity);
    }).then((points: object[]) => {
        return buildFile(points, activity);
    }).then((filePath: string) => {
        res.send({ status: "ok", token: accessToken,file: filePath });
    }).catch((error: Error) => {
        return res.status(500).send({ message: "There was an error processing the file.", error: error });
    });

    
}
