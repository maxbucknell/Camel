var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  
  , app = express()

app.configure(function () {
  app.set('port', 29722)
  app.use(express.logger('dev'))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
})

app.configure('development', function () {
  app.use(express.errorHandler())
})

app.get('/posts', routes.getPosts)
app.post('/posts', routes.postPosts)
app.put('/posts', routes.putPosts)

app.get('/posts/:id', routes.getPost)
app.put('/posts/:id', routes.putPost)
app.delete('/posts/:id', routes.deletePost)

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'))
})
