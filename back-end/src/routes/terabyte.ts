import { Router, Request, Response } from 'express';
import moment from 'moment';
import mainFunctions from '../mainFunctions';
import scrapingTerabyte from '../usecase/DoTerabyteCase'


const terabyte = Router()

terabyte.get("/search/placavideoamd", async (req: Request, res: Response) =>{
    let dataSaved = "{}"
    const nameFile = "terabyte/placaVideoAmd.json"
    try{
        dataSaved = await mainFunctions.readFile(nameFile)
    }catch{
        console.log("arquivo não existe, Criando Arquivo...")
        mainFunctions.createFile(nameFile)
    }
    const dateCurrent = moment().format("YYYYMMDD")
    const datajson = JSON.parse(dataSaved)
    if(datajson[dateCurrent]){
        res.json(datajson[dateCurrent])
    } else {
        const items = await scrapingTerabyte.start("https://www.terabyteshop.com.br/hardware/placas-de-video/amd-radeon")
        res.json(items)
    }
})




export default terabyte