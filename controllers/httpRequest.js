const http = require('http')

var httpRequest = {}

httpRequest.options = {
    hostname: 'localhost',
    port: 4005,
    path: '/productos',
    method: 'GET'
}

httpRequest.method = () =>{
    return new Promise((resP,rej) => {
        let req = http.request(httpRequest.options , res => {
            console.log(`statusCode: ${res.statusCode}`)
            res.on('data', d => {
              resP(d)
            })
        })
        
        req.on('error', error => {
            console.error(error)
            rej(error)
        })
          
        req.end()
    })
}

module.exports = httpRequest