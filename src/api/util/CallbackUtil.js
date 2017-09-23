'use strict'

import ResponseHelper from '../helper/ResponseHelper'

export default class UIDUtil {

	constructor(){
		this.response = new ResponseHelper();
	}

	whenSearch(req, res) {
		if(!req.query.query){
			let error = {
				"returnCode" : "",
				"message" : "",
				"severity" : "",
				"returnCode" : "",
				"returnCode" : "",
				"returnCode" : ""
			}
			this.response.onError(res, code, error);
		}
		let query = this.builder.buildQueryString(index.index, index.type, req.query.query);
		db.search(query).then(function (resp) {
			res.json(resp.hits.hits);
		}, function (err) {
			res.json(err);
		});
	}


	whenSearch(res) {
		return (err, data) => {
			if (err) {
				response.onError(res, HTTP_CODE.INTERNAL_ERROR, {
					"returnCode" : RETURN_CODE.ERR_TEC_SEARCH_ENGINE_UNREACHABLE,
					"message" : err.message,
					"severity" : SEVERITY.ERROR
				});
			} else {
				response.onSuccess(res, data);
			}
		};
	}

}
