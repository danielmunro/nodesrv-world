import * as express from 'express'
import * as cors from 'cors'
const app = express()
const port = 8081

app.use(cors())

app.get('/mob/:uuid', (_, res) => {
    return res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
