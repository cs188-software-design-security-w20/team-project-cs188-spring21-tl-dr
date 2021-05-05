'use strict';
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var debug = require('debug')('gulp');
var todo = require('gulp-todo');
var mocha = require('gulp-mocha');
var _ = require('lodash');

var runSequence = require('run-sequence');
var conventionalChangelog = require('gulp-conventional-changelog');
var conventionalGithubReleaser = require('conventional-github-releaser');
var bump = require('gulp-bump');
var gutil = require('gulp-util');
var git = require('gulp-git');
var fs = require('fs');
var config = require('./config');
var argv = require('minimist');



// gulp.task('lint', function() {
//     return gulp.src(['./*.js', './**/*.js', '!./node_modules/**', '!./node_modules/*.js', '!./template/*.js'])
//         .pipe(eslint())
//         .pipe(eslint.format())
//         .pipe(eslint.failAfterError());
// });

gulp.task('default', function() {
    var stream = nodemon({ script: 'app.js', env: { 'NODE_ENV': 'development', 'DEBUG': 'gulp' }, tasks: ['test'] });

    stream
        .on('restart', function() {
            debug('restarted!');
        })
        .on('crash', function() {
            debug('Application has crashed!\n');
            stream.emit('restart', 10); // restart the server in 10 seconds 
        });
});

gulp.task('test', function() {
    // Override RATE LIMIT HERE FOR UNIT TEST
    // process.env.RATE_LIMIT = 10;
    process.env.SECURE_MODE = true;
    process.env.NO_CACHE = 'no';
    process.env.NODE_ENV = 'test';
    gulp.src('./test', { read: false })
        // `gulp-mocha` needs filepaths so you can't have any plugins before it 
        .pipe(mocha({
            reporter: 'spec'
        }));
});

// Remember to pass argument '--name TheServiceName' or '-n TheServiceName' to the service creation command
// If you want to use an API as a database model, pass the base url and the endpoint. '--baseurl http://google.com' or '--b http://google.com'
// '--endpoint users' or '--e users'
// Note that the name must be singular
gulp.task('service', function(done) {
    var args = argv(process.argv.slice(2));
    var name;
    var baseurl;
    var endpoint;
    var isSQL;
    baseurl = args.baseurl;
    endpoint = args.endpoint;
    if (!baseurl) {
        baseurl = args.b;
    }

    if (!endpoint) {
        endpoint = args.e;
    }

    isSQL = args.sql;

    name = args.name;

    if (!name) {
        name = args.n;
    }

    if (!name) {
        throw new Error('Please, pass the service name using the "-n" argument or "--name" argument');
    }

    var namePlural = _.lowerCase(name) + 's';
    var nameCapitalise = _.capitalize(name);
    var nameCapitalisePlural = _.capitalize(name) + 's';
    var nameLowerCase = _.lowerCase(name);

    // Create the Route
    fs.readFile('./template/route.tmpl', function(err, data) {
        if (err) {
            throw err;
        }
        var tpl = _.template(data);
        var result = tpl({ service: nameCapitalise, object: nameLowerCase });

        fs.writeFile('./routes/' + namePlural + '.js', result, function(err) {
            if (err) {
                throw err;
            }
            console.log('Route created at ./routes/' + namePlural + '.js');
        });
    });

    // Create the Route Unit Test
    fs.readFile(isSQL ? './template/route_sql_test.tmpl' : './template/route_test.tmpl', function(err, data) {
        if (err) {
            throw err;
        }
        var tpl = _.template(data);
        var result = tpl({ service: nameCapitalise, object: nameLowerCase });

        fs.writeFile('./test/routes/' + namePlural + '.js', result, function(err) {
            if (err) {
                throw err;
            }
            console.log('Route unit test created at ./test/routes/' + namePlural + '.js');
        });
    });

    // Create the Model
    if (baseurl && endpoint) {
        fs.readFile('./template/model_api.tmpl', function(err, data) {
            if (err) {
                throw err;
            }
            var tpl = _.template(data);
            var result = tpl({ baseurl: baseurl, endpoint: endpoint });

            fs.writeFile('./models/' + nameCapitalisePlural + '.js', result, function(err) {
                if (err) {
                    throw err;
                }
                console.log('Model created at ./models/' + nameCapitalisePlural + '.js');
            });
        });
    }
    else {
        fs.readFile(isSQL ? './template/model_sql.tmpl' : './template/model.tmpl', function(err, data) {
            if (err) {
                throw err;
            }
            var tpl = _.template(data);
            var result = tpl({ service: nameCapitalise, object: nameLowerCase });

            fs.writeFile('./models/' + nameCapitalisePlural + '.js', result, function(err) {
                if (err) {
                    throw err;
                }
                console.log('Model created at ./models/' + nameCapitalisePlural + '.js');
            });
        });
    }

    // Create the Model Unit Test
    fs.readFile(isSQL ? './template/model_sql_test.tmpl' : './template/model_test.tmpl', function(err, data) {
        if (err) {
            throw err;
        }
        var tpl = _.template(data);
        var result = tpl({ service: nameCapitalise, object: nameLowerCase });

        fs.writeFile('./test/models/' + namePlural + '.js', result, function(err) {
            if (err) {
                throw err;
            }
            console.log('Model unit test created at ./test/models/' + namePlural + '.js');
        });
    });

    // Create the controller
    fs.readFile(isSQL ? './template/controller_sql.tmpl' : './template/controller.tmpl', function(err, data) {
        if (err) {
            throw err;
        }
        var tpl = _.template(data);
        var result = tpl({ service: nameCapitalise, object: nameLowerCase });

        fs.writeFile('./controllers/' + nameCapitalisePlural + '.js', result, function(err) {
            if (err) {
                throw err;
            }
            console.log('Controller created at ./controllers/' + nameCapitalisePlural + '.js');
        });
    });

    // Create the controller Unit test
    fs.readFile(isSQL ? './template/controller_sql_test.tmpl' : './template/controller_test.tmpl', function(err, data) {
        if (err) {
            throw err;
        }
        var tpl = _.template(data);
        var result = tpl({ service: nameCapitalise, object: nameLowerCase });

        fs.writeFile('./test/controllers/' + namePlural + '.js', result, function(err) {
            if (err) {
                throw err;
            }
            console.log('Controller unit test created at ./test/controllers/' + namePlural + '.js');
        });
    });

    return done();

});

// generate a todo.md from your javascript files 
gulp.task('todo', function() {
    gulp.src(['./*.js', './**/*.js', '!./node_modules/**', '!./node_modules/*.js'])
        .pipe(todo())
        .pipe(gulp.dest('./'));
    // -> Will output a TODO.md with your todos 
});

gulp.task('sanity', gulp.series('test', 'todo'));

// Release

gulp.task('changelog', function() {
    return gulp.src('./CHANGELOG.md', {
        buffer: false
    })
        .pipe(conventionalChangelog({
            preset: 'angular' // Or to any other commit message convention you use.
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('github-release', function(done) {
    conventionalGithubReleaser({
        type: 'oauth',
        token: config.gitOAuthToken // change this to your own GitHub token or use an environment variable
    }, {
        preset: 'angular' // Or to any other commit message convention you use.
    }, done);
});

// Remember to pass argument '-r patch/minor/major' to the release command
gulp.task('bump-version', function() {
    var args = argv(process.argv.slice(2));
    // We hardcode the version change type to 'patch' but it may be a good idea to
    // use minimist (https://www.npmjs.com/package/minimist) to determine with a
    // command argument whether you are doing a 'major', 'minor' or a 'patch' change.
    if (!args.r) {
        throw new Error('The release type is not defined! Please pass the -r switch with a release type argument (patch/minor/major)');
    }
    else {
        return gulp.src(['./package.json'])
            .pipe(bump({ type: args.r }).on('error', gutil.log))
            .pipe(gulp.dest('./'));
    }
});

gulp.task('commit-changes', function() {
    return gulp.src('.')
        .pipe(git.add())
        .pipe(git.commit('[Prerelease] Bumped version number'));
});

gulp.task('push-changes', function(cb) {
    git.push('origin', 'dev', cb);
});

gulp.task('create-new-tag', function(cb) {
    var getPackageJsonVersion = function() {
        // We parse the json file instead of using require because require caches
        // multiple calls so the version number won't be updated
        return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
    };
    var version = getPackageJsonVersion();
    git.tag(version, 'Created Tag for version: ' + version, function(error) {
        if (error) {
            return cb(error);
        }
        git.push('origin', 'dev', { args: '--tags' }, cb);
    });
});

gulp.task('release_done', function(cb) {
    console.log('RELEASE FINISHED SUCCESSFULLY');
    cb();
});

gulp.task('release', gulp.series(
    'bump-version',
    'changelog',
    'commit-changes',
    'push-changes',
    'create-new-tag',
    'github-release',
    'release_done'));
