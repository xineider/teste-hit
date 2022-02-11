'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class ContatoModel {

	InsertContato(POST){
		return new Promise(function (resolve, reject) {
			helper.Insert('contato',POST).then(data =>{
				resolve(data);
			});
		});
	}

}


module.exports = ContatoModel;