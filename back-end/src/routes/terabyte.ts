import { Router, Request, Response } from 'express';
import moment from 'moment';
import mainFunctions from '../mainFunctions';
import scrapingTerabyte from '../usecase/DoTerabyteCase'


const router = Router()

router.get("/search/placavideoamd", async (req: Request, res: Response) =>{
    rounterFunction(
        res, 
        "terabyte/placaVideoAmd.json", 
        "https://www.terabyteshop.com.br/hardware/placas-de-video/amd-radeon",
        "amd"
    )
})
router.get("/search/placavideonvidia", async (req: Request, res: Response) =>{
    rounterFunction(
        res, 
        "terabyte/placaVideoNvidia.json", 
        "https://www.terabyteshop.com.br/hardware/placas-de-video/nvidia-geforce",
        "nvidia"
    )
})
router.get("/search/processadorintel", async (req: Request, res: Response) =>{
    rounterFunction(
        res, 
        "terabyte/processadorIntel.json", 
        "https://www.terabyteshop.com.br/hardware/processadores/intel",
        "intel"
    )
})
router.get("/search/processadoramd", async (req: Request, res: Response) =>{
    rounterFunction(
        res, 
        "terabyte/processadorAmd.json", 
        "https://www.terabyteshop.com.br/hardware/processadores/amd-ryzen",
        "amd"
    )
})
router.get("/search/promocoes", async (req: Request, res: Response) =>{
    rounterFunction(
        res, 
        "terabyte/promocoes.json", 
        "https://www.terabyteshop.com.br/promocoes",
        ""
    )
})


async function rounterFunction(res: Response, nameFile: string, link: string, marca: string) {
    let dataRead = "{}"
    try{
        dataRead = await mainFunctions.readFile(nameFile)
    }catch{
        console.log("arquivo não existe, Criando Arquivo...")
        mainFunctions.createFile(nameFile)
    }
    const dateCurrent = moment().format("YYYYMMDD")
    const datajson = JSON.parse(dataRead)
    if(datajson[dateCurrent]){
        res.json(datajson[dateCurrent])
    } else {
        const items = await scrapingTerabyte.start(link, marca)
        let dataSaved: any = {}
        dataSaved[dateCurrent] = items
        await mainFunctions.whiteFile(nameFile, JSON.stringify(dataSaved))
        res.json(dataSaved)
    }
}




export default router