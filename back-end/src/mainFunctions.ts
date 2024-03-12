import fs from "fs"


export default new class mainFunctions {

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
}