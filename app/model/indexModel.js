'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class IndexModel {


	GetConteudo() {
		return new Promise(function (resolve, reject) {
			helper.Query('SELECT  * FROM home').then(data => {
					resolve(data);
					
				});
		});
	}
}
module.exports = IndexModel;
