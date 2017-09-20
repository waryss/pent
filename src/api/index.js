'use strict'

import { Router } from 'express';

import genericRoute from './route/genericRoute';
import { name, version, description, author, engines } from '../../package.json'

export default ({ config, db, app }) => {
	let api = Router();

	api.get('/info', (req, res) => {
		res.json({ name, version, description, author, engines });
	});

	api.get('/ping', (req, res) => {
		db.ping({
			requestTimeout: config.es.requestTimeout
		}, function (error) {
			if (error) {
				res.json(error);
			} else {
				res.json({ "response" : "pong" });
			}
		});
	});

	app.use('/api/needs', genericRoute({ db, 'index' : config.es.indexs.needs, config }));
	app.use('/api/users', genericRoute({ db, 'index' : config.es.indexs.users, config }));
	app.use('/api/recipients', genericRoute({ db, 'index' : config.es.indexs.recipients, config }));

	return api;
}
