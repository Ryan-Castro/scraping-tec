import { Router, Request, Response } from 'express';
import moment from 'moment';
import mainFunctions from '../mainFunctions';


const terabyte = Router()

terabyte.get("/search/placavideoamd", async (req: Request, res: Response) =>{
    const dataSaved = await mainFunctions.readFile("terabyte/placaVideoAmd.json")
    const datajson = JSON.parse(dataSaved)
    res.json(datajson)
})




export default terabyte