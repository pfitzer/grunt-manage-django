/*
 * grunt-manage-django
 * https://github.com/pfitzer/grunt-manage-django
 *
 * Copyright (c) 2016 Michael Pfister
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var spawn = require('child_process').spawn,
        exec = require('child_process').exec;

    grunt.registerMultiTask('manage_django', 'Manage django tasks with grunt.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            project_root: ''
        });
        var done = this.async();
        var cmd = 'source ' + options.project_root + 'env/bin/activate && ' + options.project_root + 'manage.py test';
        var venv = exec(cmd, function (err, stdout, stderr) {
            if (err) throw err;
            done(err);
        });
        venv.stdout.on('data', function (d) {
            grunt.log.write(d);
        });
        venv.stderr.on('data', function (d) {
            grunt.log.write(d);
        });

        venv.stdout.on('error', function (d) {
            grunt.log.write(d);
        });
        venv.stdout.on('exit', function (d) {
            grunt.log.write(d);
        });
        venv.stdout.on('end', function (d) {
            grunt.log.write(d);
            done();
        });
    });

};
