'use strict'

require('./main.less')

const angular = require('angular')
const talksFilters = require('./filters')
const TalkController = require('./controller')

const App = angular.module('talks', ['talksFilters'])

App.controller('TalkController', TalkController)
