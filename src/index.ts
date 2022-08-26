import express from 'express'
import api from './routes/api/index'
export const app = express()


app.get('/', (req:express.Request , res:express.Response) => {
    res.send('Worked')
})
app.use('/api', api)

app.listen(3000 , ()=> {
    console.log(`Server is hosted on port 3000`)
})