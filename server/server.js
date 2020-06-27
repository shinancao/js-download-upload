const http = require('http')
const url = require('url')

const hostname = 'localhost'
const port = 3000

function start(route, handle) {
    const server = http.createServer(function(request, response) {
        // 允许跨域访问
        response.setHeader('Access-Control-Allow-Origin', '*')
        response.setHeader('Access-Control-Allow-Methods', ['GET', 'POST'])
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        
        const pathname = url.parse(request.url).pathname
        console.log("Request for " + pathname + " received.")
        route(handle, pathname, response, request)
    })

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`)
    })
}

exports.start = start
