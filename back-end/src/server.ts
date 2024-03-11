import express from 'express'
import { Router, Request, Response } from 'express';
import terabyte from './routes/terabyte'

const app = express();
const route = Router()
app.use(express.json())


route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
})


route.use('/terabyte', terabyte)



app.use(route)
app.listen(3333, () => {
    console.log('server running on port 3333')
})
