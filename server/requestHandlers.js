const fs = require('fs')
const url = require('url')

function upload(response, request) {

}

function download(response, request) {
    console.log('Request handler "download" was called.')

    const imgPath = url.parse(request.url).pathname
    fs.readFile('.' + imgPath, 'binary', function(err, data) {
        if (err) {
            response.writeHead(500, {'Content-Type': 'text/plain'})
            response.write(err + '\n')
            response.end()
        } else {
            response.writeHead(200, {'Content-Type': 'image/jpeg'})
            response.write(data, 'binary')
            response.end()
        }
    })
}

function imageList(response, request) {
    console.log('Request handler "imageList" was called.')

    const list = [{id: 1, url: '/images/0bbc0f38234341.5eea491956f73.jpg'}, {id: 2, url: '/images/391e0b38234341.5eea382ab17d1.jpg'}, {id: 3, url: '/images/2aecdb38234341.5eea382ab1eb2.jpg'}]
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.write(JSON.stringify(list))
    response.end()
}

exports.upload = upload
exports.download = download
exports.imageList = imageList
