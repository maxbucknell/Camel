//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//     //
//  # Camel.                                    //    _oo\
// ## A new take on blogging.                  //    (__/ \  _  _
//    Because it's about time somebody did    //        \  \/ \/ \
//    something that isn't just a reverse    //         (         )\
//    chronological list of articles        //           \_______/  \
//                                         //             [[] [[]
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//              [[] [[]

~function () {
  var express = require('express')
    , http    = require('http')
    
    , SomethingWentWrongError = function (statusCode, message, req) {
        try {
          this.statusCode = req.query.suppress_response_codes ? 200 : statusCode
        } catch (e) {
          this.statusCode = statusCode
        }
        
        this.message = {
            status  : statusCode
          , message : message || 'Some ignorant slut didn\'t think you important enough to get a decent error message.'
        }
      }
    
    , unusedEndpointError = new SomethingWentWrong(405, 'The endpoint you asked for exists, but does not respond to that method.')
    , notAuthenticatedError = new SomethingWentWrong(401, 'Please provide a valid API signature.')
    , notAuthorisedError = new SomethingWentWrong(403, 'That API signature does not grant you to access that resource.')
    
    , dispatch = function (dir, auth) {
        dir = dir[0].toUpper() + dir.slice(1)
        return function (req, res) {
          var signature = req.query.signature
            , authenticated = isSigValid(signature)
            , authorised = isSigValidForResource(signature, req.route, auth)
            
            , outputFunc = routes[req.route.method + dir] || unusedEndpoint
          
          va
          
          try {
            res.send(valid ? 
          } catch (e) {
            // We know about these
            if (e.statusCode) res.send(e.statusCode, e.message)
            // Something else happened
            else              throw e;
          }
        }
      }
    
    , routes = {
        getPosts    : function (req) {
          return ['hello', 'world']
        }
      , postPosts   : function (req) {
          return ['hello', 'world']
        }
      , putPosts    : function (req) {
          return ['hello', 'world']
        }
        
      , getPost     : function (req) {
          return ['hello', 'world']
        }
      , putPost     : function (req) {
          return ['hello', 'world']
        }
      , deletePost  : function (req) {
          return ['hello', 'world']
        }
    }
    
    , app = express()
  
  app.enable('trust proxy')
  
  app.all('/posts', dispatch('posts', ['put', 'post', 'delete']))
  app.all('/posts/:id', dispatch('posts', ['put', 'post', 'delete']))
  
  http.createServer(app).listen(29722)
}()
