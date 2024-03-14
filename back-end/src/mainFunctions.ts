import fs from "fs"


export default new class mainFunctions {
    
    async waitFor(time:number){
        return await new Promise(async (resolve)=>{
            setInterval(()=>{
                resolve(true)
            }, time)
        })
    }

    async readFile(nameFile:string): Promise<string> {
        return await new Promise(async (resolve, reject)=>{
            try{
                const path = "./files/" + nameFile
                const data = fs.readFileSync(path, 'utf-8')
                resolve(data)
            }catch (err){
                reject(err)
            }
        })
    }

    async createFile(nameFile:string): Promise<boolean> {
        return await new Promise(async (resolve, reject)=>{
            try{
                const path = "./files/" + nameFile
                fs.writeFileSync(path, '{}')
                resolve(true)
            }catch (err){
                reject(err)
            }
        })
    }
    async whiteFile(nameFile:string, data: string): Promise<boolean> {
        return await new Promise(async (resolve, reject)=>{
            try{
                const path = "./files/" + nameFile
                fs.writeFileSync(path, data)
                resolve(true)
            }catch (err){
                reject(err)
            }
        })
    }
}