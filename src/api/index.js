'use strict'

import { Router } from 'express';

import UserRoute from './route/UserRoute';
import NeedRoute from './route/NeedRoute';

import { name, version, description, author, engines } from '../../package.json'

export default ({ config, db, app }) => {
	let api = Router();

	api.get('/info', (req, res) => {
		res.json({ name, version, description, author, engines });
	});

	api.get('/health', (req, res) => {
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

	app.use('/api/users', new UserRoute({ db, 'index' : config.es.indexs.users, config }));
	app.use('/api/needs', new NeedRoute({ db, 'index' : config.es.indexs.needs, config }));

	return api;
}
