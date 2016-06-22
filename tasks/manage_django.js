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
        exec = require('child_process').exec,
        async = require('async');

    grunt.registerMultiTask('manage_django', 'Manage django tasks with grunt.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            project_root: '',
            use_venv: true,
            venv_dir: ''
        });

        async.series(
            [
                function(callback) {
                    exec('source ' + options.venv_dir + 'bin/activate');
                    callback(null, 1);
                },
                function(callback) {
                    exec('python ' + options.project_root + ' manage.py test', function(error, stdout, stderr) {
                        if(error) throw error;
                    });
                    callback(null, 1);
                }
            ],
            function(err, results) {
                grunt.log.write(results);
            }
        );
    });
};
