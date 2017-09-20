'use strict'

import { Router } from 'express';

export default ({ config, db }) => {
	let routes = Router();

	routes.use((req, res, next) => {
		console.log('Time:', Date.now());
		next();
	});

	routes.use(function(err, req, res, next) {
		console.error(err.stack);
		res.status(500).send('Something broke!');
	});

	return routes;
}
