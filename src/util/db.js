'use strict'

import {es} from './config';
import elasticsearch from 'elasticsearch';

export default callback => {
	callback(new elasticsearch.Client({
		host: es.url,
		log: es.log
	}));
}
