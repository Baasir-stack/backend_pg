const http = require('http')
const fs = require('fs')
const moment = require('moment')
const url = require('url')


const myServer = http.createServer((req, res) => {
    if(req.url === "/favicon.ico") return res.end()
    const date = moment().format('YYYY-MM-DD hh:mm:ss')
    const log = `${date}: ${req.url} New Req Received  \n`
    const myUrl = url.parse(req.url, true)
    console.log(myUrl)
    fs.appendFile('./logFile.txt', log, (err, data) => {
        switch (myUrl.pathname) {
            case "/":
                res.end("Homepage")
                break;
            case "/about":
                const username = myUrl.query.username
                res.end(`Hi ${username}`)
                break;
            case "/search":
                const search = myUrl.query.search_query
                res.end("Here are your results for "+search)
                break;
            default:
                res.end("404 Not Found")

                
        }
    })
})

myServer.listen(3000, () => {
    console.log(`Server running`)
})