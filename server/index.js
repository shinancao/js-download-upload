const server = require('./server')
const router = require('./router')
const requestHandlers = require('./requestHandlers')

const handle = {}
handle['/upload'] = requestHandlers.upload
handle['/download'] = requestHandlers.download
handle['/imageList'] = requestHandlers.imageList

server.start(router.route, handle)