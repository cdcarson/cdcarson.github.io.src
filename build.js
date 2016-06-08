module.exports = function (callback) {
	var Metalsmith = require('metalsmith');
	var collections = require('metalsmith-collections');
	var gutil = require("gulp-util");
	var markdown   = require('metalsmith-markdown');
	var layouts = require('metalsmith-layouts');
	var permalinks = require('metalsmith-permalinks');
	var drafts = require('metalsmith-drafts');
	var excerpts = require('metalsmith-excerpts');
	var archive = require('metalsmith-archive');




	console.log('building...');
	Metalsmith(__dirname)
		.metadata({site_name: "My Site"})
		.use(drafts())
		.use(collections({
			posts: {
				pattern: 'posts/**/*.md',
				sortBy: 'date',
				reverse: true
			}
		}))


		.use(markdown())


		.use(excerpts())


		.use(permalinks({
	      // original options would act as the keys of a `default` linkset,
	    //   pattern: ':title',
	    //   date: 'YYYY',

	      // each linkset defines a match, and any other desired option
	      linksets: [{
	          match: { collection: 'posts' },
	          pattern: ':title',
	          date: 'mmddyy'
	      },{
	          match: { collection: 'pages' },
	          pattern: 'pages/:title'
	      }]
	  }))
	  .use (function (files, metalsmith, done) {
		  metalsmith.metadata().collections.posts.forEach(function (p) {
			  //console.log(p);
		  });
		  done();
	  })
		.use(layouts({
			cache: false,
			engine: 'swig',
			'default': 'default.swig',
			directory: './layouts'


		}))


		
		.build(function(err) {
			if (err){
				var gutil = require('gulp-util');
			    gutil.log( gutil.colors.magenta(err.message), err);
			    gutil.beep();
			}
			callback();
		});


};
