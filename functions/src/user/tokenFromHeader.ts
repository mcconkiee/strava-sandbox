import {Request} from 'express'
module.exports = (req:Request)=>{
    const headerVal:string = req.headers['authorization'] as string
    const userAccessToken = headerVal.split('Bearer ')[1]
    return userAccessToken;
}
