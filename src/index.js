import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

import api from './api';
import middleware from './middleware';

import initializeDb from './util/db';
import config from './util/config';

let app = express();
app.server = http.createServer(app);

app.use(express.static(__dirname + '/public'));
// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

app.use(methodOverride('X-HTTP-Method-Override'));

// connect to db
initializeDb( db => {
	// api router
	app.use('/api', api({ config, db, app }));
	// middleware
	app.use('/', middleware({ config, db }));

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;
