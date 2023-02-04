import express, { json } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

console.log(dotenv.config())
dotenv.config();
console.log(process.env.OMG_KEY) 

const app = express()
app.use(cors())
app.use(express.json())
app.get('/', async(req, res) => {
    res.status(200).send({ message : 'hello world'}) 
})

app.post('/', async(req, res) => {
    try {
        
        const prompt = req.body.prompt;
        console.log(prompt)
        res.status(200).send({answer : prompt + ' answer'})
    } catch (error)
    {
        res.status(500).send ({error})
    }
})
 
app.listen(5000, ()=>{
    console.log("Started on port http://localhost:5000")
})

