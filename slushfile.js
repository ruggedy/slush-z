/*
 * slush-angular2-component
 * https://github.com/ruggedy/slush-angular2-component
 *
 * Copyright (c) 2016, deathstalker
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path');

function format(string) {
    var username = string.toLowerCase();
    return username.replace(/\s/g, '');
}

var defaults = (function () {
    var workingDirName = path.basename(process.cwd()),
      homeDir, osUserName, configFile, user;

    if (process.platform === 'win32') {
        homeDir = process.env.USERPROFILE;
        osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
    }
    else {
        homeDir = process.env.HOME || process.env.HOMEPATH;
        osUserName = homeDir && homeDir.split('/').pop() || 'root';
    }

    configFile = path.join(homeDir, '.gitconfig');
    user = {};

    if (require('fs').existsSync(configFile)) {
        user = require('iniparser').parseSync(configFile).user;
    }

    return {
        appName: workingDirName
    };
})();

gulp.task('default', function (done) {
    var prompts = [{
        name: 'appName',
        message: 'What is the name of your component?',
        default: defaults.appName
    }];
    //Ask
    inquirer.prompt(prompts,
        function (answers) {
            answers.appNameSlug = _.slugify(answers.appName);
            answers.appNameClassify = _.classify(answers.appName);
            answers.appNameDasherize = _.dasherize(answers.appName);
            gulp.src(__dirname + '/templates/defaults/**')
                .pipe(template(answers))
                .pipe(rename(function (file) {
                    if (file.basename[0] === '_') {
                        file.basename = answers.appNameDasherize + '.' + file.basename.slice(1);
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./src/client/app/'+'+'+answers.appNameDasherize+'/'))
                .pipe(install())
                .on('end', function () {
                    done();
                });
        });
});

gulp.task('shared-comp', function (done) {
    var prompts = [{
        name: 'appName',
        message: 'What is the name of your component?',
        default: defaults.appName
    }];
    //Ask
    inquirer.prompt(prompts,
        function (answers) {
            answers.appNameSlug = _.slugify(answers.appName);
            answers.appNameClassify = _.classify(answers.appName);
            answers.appNameDasherize = _.dasherize(answers.appName);
            gulp.src(__dirname + '/templates/shared-comp/**')
                .pipe(template(answers))
                .pipe(rename(function (file) {
                    if (file.basename[0] === '_') {
                        file.basename = answers.appNameDasherize + '.' + file.basename.slice(1);
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./src/client/app/shared/'+answers.appNameDasherize+'/'))
                .pipe(install())
                .on('end', function () {
                    done();
                });
        });
});

gulp.task('comp', function (done) {
    var prompts = [{
        name: 'appName',
        message: 'What is the name of your component?',
        default: defaults.appName
    }];
    //Ask
    inquirer.prompt(prompts,
        function (answers) {
            answers.appNameSlug = _.slugify(answers.appName);
            answers.appNameClassify = _.classify(answers.appName);
            answers.appNameDasherize = _.dasherize(answers.appName);
            gulp.src(__dirname + '/templates/shared-comp/**')
                .pipe(template(answers))
                .pipe(rename(function (file) {
                    if (file.basename[0] === '_') {
                        file.basename = answers.appNameDasherize + '.' + file.basename.slice(1);
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./src/client/app/'+answers.appNameDasherize+'/'))
                .pipe(install())
                .on('end', function () {
                    done();
                });
        });
});

