;
~function (name, context, definition) {
	if (typeof module !== 'undefined' && module.exports) module.exports = definition()
	else if (typeof define === 'function' && define.amd) define(name, definition)
	else context[name] = definition()
}('routes', this, function () { 'use strict'
	var util = require('util')

		, createAPIEndpoint = function (output) {			
				return function (req, res) {
					try
						res.send(output(req));
					catch e
						if (e.statusCode) res.send(e.statusCode, e.message)
						else              throw e;
				}
			}
	
			// Checking validity is easy. Since I'm using node.js, I can have lots of async
			// things running that change that value, and I just need to check it whenever.
		, postIsValid = function (post) {
				return post.credit > 0;
			}
			
		, SomethingWentWrong = function (statusCode, message, req) {
				try
					this.statusCode = req.query.suppress_response_codes ? 200 : statusCode
				catch e
					this.statusCode = statusCode
				
				this.message = { 'message': message || 'Some ignorant slut didn\'t think you important enough to get a decent error message.' }
			}

	return {
		// Below are routes of the form /posts[?...]
			
			getPosts    : createAPIEndpoint(function (req) {
				// Result of function is HTTP body.
				// Since response is JSON, please return objects
				// To give a different status:
				// throw new SomethingWentWrong(418, 'Idiot!')
			})
		, postPosts   : createAPIEndpoint(function (req) {
				
			})
		, putPosts    : createAPIEndpoint(function (req) {
				
			})
		
		// Below are routes of the form /posts/id[?...]
		
		, getPost     : createAPIEndpoint(function (req) {
				
			})
		, putPosts    : createAPIEndpoint(function (req) {
				
			})
		, deletePost  : createAPIEndpoint(function (req) {
				
			})
	}
})