
/*
This module represents the execution root of the Task Server.
We use this module that is outside the Task Server folder to 
load all node dependencies and get them ready to the actual App.
*/

/* 
The TS object is accesible everywhere at the Superalgos Platform Client. 
It provides access to all modules built for the Task Server.
*/
global.TS = {}
/* 
The SA object is accesible everywhere at the Superalgos Desktop App. 
It provides access to all modules built for Superalgos in general.
*/
global.SA = {}
/* Load Environment Variables */
let ENVIRONMENT = require('./Environment.js');
let ENVIRONMENT_MODULE = ENVIRONMENT.newEnvironment()
global.env = ENVIRONMENT_MODULE
/*
First thing is to load the project schema file.
*/
global.PROJECTS_SCHEMA = require(global.env.PATH_TO_PROJECT_SCHEMA)
/* 
Setting up the modules that will be available, defined at the Project Schema file. 
*/
let MULTI_PROJECT = require('./MultiProject.js');
let MULTI_PROJECT_MODULE = MULTI_PROJECT.newMultiProject()
MULTI_PROJECT_MODULE.initialize(TS, 'TS')
MULTI_PROJECT_MODULE.initialize(SA, 'SA')
/*
Setting up external dependencies.
*/
SA.nodeModules = {
    fs: require('fs'),
    util: require('util'),
    path: require('path'),
    ws: require('ws'),
    ip: require('ip'),
    telegraf: require('telegraf'),
    https: require('https'),
    http: require('http'),
    web3: require('web3'),
    nodeFetch: require('node-fetch'),
    ccxt: require('ccxt'),
    ccxtMisc: require('./node_modules/ccxt/js/base/functions/misc'),
    lookpath: require('lookpath'),
    twitter: require('twitter')
}

run()

async function run() {
    TS.app = require('./TaskServer/TaskServer.js').newTaskServer()
    await TS.app.run()
    console.log('Superalgos TaskServer is Running!')
}
