import { Router, Request, Response } from 'express';

const terabyte = Router()

terabyte.get("/create", (req: Request, res: Response) =>{
    res.send("aaaaaaaaaa")
})

export default terabyte