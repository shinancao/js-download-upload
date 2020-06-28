const fs = require('fs')
const url = require('url')
const formidable = require('formidable')

function upload(response, request) {
    console.log('Request handler "upload" was called.')

    const form = new formidable.IncomingForm()
    form.parse(request, function(error, fields, files) {
        let fileurl = fields.fileurl
        if (!fileurl) {
            // 第一次传过来
            let time = new Date().getTime()
            fileurl = '/uploaded_files/' + time + '_' + fields.filename
        }
        
        const tmpBuffer = fs.readFileSync(files.filedata.path)
        fs.appendFile(`.${fileurl}`, tmpBuffer, 'binary', function(error) {
            if (error) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(error + "\n")
                response.end()
            } else {
                response.writeHead(200, {'Content-Type': 'application/json'})
                response.write(JSON.stringify({fileurl}))
                response.end()
            }
        })
        
    })
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

    const dir = '/images/'
    fs.readdir('.' + dir, function(err, files) {
        let list = []
        if (!err) {
            list = files.filter(f => /(\.jpg)$/.test(f)).map((f, i) => {
                return {id: i+1, url: `${dir}${f}`}
            })
        }

        response.writeHead(200, {'Content-Type': 'application/json'})
        response.write(JSON.stringify(list))
        response.end()
    })
}

exports.upload = upload
exports.download = download
exports.imageList = imageList
