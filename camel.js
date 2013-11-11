//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//     //                    //
//  # Camel.                                    //    _oo\                   //
// ## A new take on blogging.                  //    (__/ \  _  _           //
//    Because it's about time somebody did    //        \  \/ \/ \         //
//    something that isn't just a reverse    //         (         )\      //
//    chronological list of articles        //           \_______/  \    //
//                                         //             [[] [[]       //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//              [[] [[]      //

~function () {
  var express = require('express')
    , http    = require('http')
    
    , asciiCamel = [ // Our camel looks a bit goofy because
          '   //'    // of backslash escaping.
        , ' _oo\\'
        , '(__/ \\  _  _'
        , '   \\  \\/ \\/ \\'
        , '   (         )\\'
        , '    \\_______/  \\'
        , '     [[] [[]'
        , '     [[] [[]'
      ].join('\n')
    
  
    , isSigValidForResource = function (signature, restricted) {
        // blah blah validate signature
        return 403
      }
    
    , getError = (function () {
        var notAuthenticated = { status: 401, message: 'Please provide a valid API signature.' }
          , notAuthorised    = { status: 403, message: 'That API signature does not grant you to access that resource.' }
          , notFound         = { status: 404, message: 'We cannot find the thing you asked for because it does not exist.'}
          , unusedEndpoint   = { status: 405, message: 'The endpoint you asked for exists, but does not respond to that method.' }
          , errorFunc = function (code) {
              switch (code) {
                case 'notAuthenticated'  :
                case 401                 : return notAuthenticated
                case 'notAuthorised'     :
                case 403                 : return notAuthorised
                case 'unusedEndpoint'    :
                case 405                 : return unusedEndpoint
                default                  : return notFound
              }
            }
          
          return errorFunc
      })()
    
    , dispatch = function (dir) {
        dir = dir[0].toUpperCase() + dir.slice(1)
        return function (req, res) {
          var method = req.route.method
            , signature = req.query.signature
            , restricted = !!(['get', 'post', 'put', 'delete'].indexOf(method) + 1)
            , isAuthorised = isSigValidForResource(signature, restricted)
            , outputFunc = routes[method + dir] || unusedEndpoint
            , response = isAuthorised === true ? outputFunc(req) : getError(isAuthorised)
            , status = response.status && !req.query.suppress_status_codes ? response.status : 200
          
          res.send(status, response)
        }
      }
    
    , routes = {
        getPosts    : function (req) {
          //...
          return { status: 200 }
        }
      , postPosts   : function (req) {
          //...
          return { status: 200 }
        }
      , putPosts    : function (req) {
          //...
          return { status: 200 }
        }
        
      , getPost     : function (req) {
          //...
          return { status: 200, id: req.params.id}
        }
      , putPost     : function (req) {
          //...
          return { status: 200, id: req.params.id }
        }
      , deletePost  : function (req) {
          //...
          return { status: 200, id: req.params.id }
        }
    }
    
    , app = express()
  
  app.enable('trust proxy')
  
  app.all('/posts/', dispatch('posts'))
  app.all('/posts/:id', dispatch('post'))
  app.get('/camels', function (req, res) { res.type('text/plain'); res.send(asciiCamel) })

  
  
  http.createServer(app).listen(29722, function () { console.log('Camel is now up and plodding. Port 29722')})
}()
