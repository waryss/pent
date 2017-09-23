'use strict'

import UIDUtil from '../util/UIDUtil';

export default class RequestBuilder {

	constructor() { }

	buildQueryString(index, type, query) {
		return { index, type, body: { query: { query_string:{ query: query } } } };
	}

	buildCreateQuery(index, type, body) {
		body.creationDate = new Date();
		return { index, type, id: UIDUtil.guid(), body };
	}

	buildGetQuery(index, type, id) {
		return { index, type, id };
	}

	buildMatchQuery(index, type, match) {
		return { index, type, body: { query: { match: match } } };
	}

}
