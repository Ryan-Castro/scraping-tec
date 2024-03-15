import { Router, Request, Response } from 'express';
import moment from 'moment';
import mainFunctions from '../mainFunctions';
import scrapingKabum from '../usecase/DoKabumCase'


const router = Router()

router.get("/search/placavideoamd", async (req: Request, res: Response) =>{
    rounterFunction(
        res, 
        "kabum/placaVideoAmd.json", 
        "https://www.kabum.com.br/hardware/placa-de-video-vga/placa-de-video-amd",
        "amd"
    )
})
router.get("/search/placavideonvidia", async (req: Request, res: Response) =>{
    rounterFunction(
        res, 
        "kabum/placaVideoNvidia.json", 
        "https://www.kabum.com.br/hardware/placa-de-video-vga/placa-de-video-nvidia",
        "nvidia"
    )
})
router.get("/search/processadorintel", async (req: Request, res: Response) =>{
    rounterFunction(
        res, 
        "kabum/processadorIntel.json", 
        "https://www.kabum.com.br/hardware/processadores/processador-intel",
        "intel"
    )
})
router.get("/search/processadoramd", async (req: Request, res: Response) =>{
    rounterFunction(
        res, 
        "kabum/processadorAmd.json", 
        "https://www.kabum.com.br/hardware/processadores/processador-amd",
        "amd"
    )
})
router.get("/search/promocoes", async (req: Request, res: Response) =>{
    rounterFunction(
        res, 
        "kabum/promocoes.json", 
        "https://www.kabum.com.br/ofertas/ofertadodia",
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
        const items = await scrapingKabum.start(link, marca)
        let dataSaved: any = {}
        dataSaved[dateCurrent] = items
        await mainFunctions.whiteFile(nameFile, JSON.stringify(dataSaved))
        res.json(dataSaved[dateCurrent])
    }
}




export default router