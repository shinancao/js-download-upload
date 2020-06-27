function route(handle, pathname, response, request) {
    console.log('About to route a request for ' + pathname)
    const reg = /^(\/images\/).*(\.jpg)$/
    if (reg.test(pathname)) {
        // 请求的是图片
        handle['/download'](response, request)
    } else if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request)
    } else {
        response.writeHead(404, {
            "Content-Type": "text/plain"
        })
        response.write('404 Not found')
        response.end()
    }
}

exports.route = route
