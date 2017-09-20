'use strict'

import { Router } from 'express';

import MailService from '../service/MailService'
import RequestBuilder from '../builder/RequestBuilder'
import ResponseService from '../service/ResponseService'

export default ({ db, index, config }) => {

	let api = Router();

	let builder = new RequestBuilder();
	let response = new ResponseService();
	let mail = new MailService(config.nodemailer);

	api.get('/:id', (req, res) => {
		let query = builder.buildGetQuery(index.index, index.type, req.params.id);
		db.get(query, response.defaultResponse(res));
	});

	api.get('/', (req, res) => {
		let query = builder.buildQueryString(index.index, index.type, req.query.query);
		db.search(query).then(function (resp) {
			res.json(resp.hits.hits);
		}, function (err) {
			res.json(err);
		});
	});

	api.post('/', (req, res, next) => {
		let query = builder.buildCreateQuery(index.index, index.type, req.body);
		db.create(query, response.defaultResponse(res));
		mail.sendmail();
	});

	return api;
}
