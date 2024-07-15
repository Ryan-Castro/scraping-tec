import express from 'express'
import { Router, Request, Response } from 'express';
import terabyte from './routes/terabyte'
import kabum from './routes/kabum'
import pichau from './routes/pichau'
import cors from 'cors'

const app = express();
app.use(cors())
const route = Router()
app.use(express.json())


route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
})


route.use('/terabyte', terabyte)
route.use('/kabum', kabum)
route.use('/pichau', pichau)




app.use(route)
app.listen(3333, () => {
    console.log('server running on port 3333')
})
