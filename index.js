const expres = require('express')
var bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
var cors = require('cors')

const app = expres();
const port= 4001

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use(fileUpload())

app.use('/API', require( './routes/index'))
 
app.listen(port, ()=>{
    console.log(`Microservicio Clientes funcionando en puerto ${port}` )
})

