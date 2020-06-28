# js-download-upload

这个小项目演示使用`fetch`和`async/await`批量下载图片，和使用`blob.slice`分割大文件并上传。并且用`node.js`实现了server端：获取图片列表、获取某一张图片，合并分割后的图片并保存。

client文件夹中`download.html`和`upload.html`分别是下载和上传的前端页面，因为在server端设置了允许 CORS 跨域请求，所以在浏览器中直接打开这两个html文件即可操作。

server文件中`images`文件夹中放的是server端本来就有的图片，`download.html`中展示的即是这里的图片，`uploaded_files`文件夹中放的是用户上传的图片。

除了使用`formidable`来解析前端传过来的参数，client端和sever端再没有使用其他框架。

启动server端：

```
$ node index.js
```

### 最终效果

批量下载图片：

<img src="https://raw.github.com/shinancao/js-download-upload/master/js-download-img.jpg"/>

上传大图片：

<img src="https://raw.github.com/shinancao/js-download-upload/master/js-upload-img.jpg"/>
