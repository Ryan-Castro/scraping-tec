import { Router, Request, Response } from 'express';
import moment from 'moment';
import mainFunctions from '../mainFunctions';
import scrapingPichau from '../usecase/DoPichauCase'


const router = Router()

router.get("/search/placavideoamd", async (req: Request, res: Response) =>{
    rounterFunction(
        res, 
        "pichau/placaVideoAmd.json", 
        "https://www.pichau.com.br/hardware/placa-de-video/amd",
        "amd"
    )
})
router.get("/search/placavideonvidia", async (req: Request, res: Response) =>{
    rounterFunction(
        res, 
        "pichau/placaVideoNvidia.json", 
        "https://www.pichau.com.br/hardware/placa-de-video/nvidia",
        "nvidia"
    )
})
router.get("/search/processadorintel", async (req: Request, res: Response) =>{
    rounterFunction(
        res, 
        "pichau/processadorIntel.json", 
        "https://www.pichau.com.br/hardware/processadores/intel",
        "intel"
    )
})
router.get("/search/processadoramd", async (req: Request, res: Response) =>{
    rounterFunction(
        res, 
        "pichau/processadorAmd.json", 
        "https://www.pichau.com.br/hardware/processadores/amd",
        "amd"
    )
})
router.get("/search/promocoes", async (req: Request, res: Response) =>{
    res.json({"Erro": "Site não contem essa rota"})
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
        const items = await scrapingPichau.start(link, marca)
        let dataSaved: any = {}
        dataSaved[dateCurrent] = items
        await mainFunctions.whiteFile(nameFile, JSON.stringify(dataSaved))
        res.json(dataSaved[dateCurrent])
    }
}




export default router