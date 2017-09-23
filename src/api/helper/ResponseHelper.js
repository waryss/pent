'use strict'

export default class ResponseHelper {

	static HTTP_CODE = {
		SUCCESS : 200,
		MISSING_PARAMETER : 400,
		NOT_FOUND : 404,
		INTERNAL_ERROR : 500
	};

	static SEVERITY = {
		WARN : "WARN",
		ERROR : "ERROR",
		FATAL : "FATAL",
		SUCCESS : "SUCCESS"
	};

	static MESSAGE = {
		UNDEFINED_ERROR : "Une erreur inconnue est survenue"
	};

	static RETURN_CODE = {
		ERR_TEC_MISSING_PARAM_QUERY : "ERR_TEC_MISSING_PARAM_QUERY",
		ERR_TEC_INVALID_PARAM_QUERY : "ERR_TEC_INVALID_PARAM_QUERY",
		ERR_TEC_MISSING_REQUEST_PAYLOAD : "ERR_TEC_MISSING_REQUEST_PAYLOAD",
		SUCCESS : "SUCCESS"
	};

	constructor() { };

	/**
	* Que faire en cas d'erreur
	* @param res la réponse HTTP
	* @param code le code HTTP
	* @param error l'erreur à renvoyer
	*/
	onError(res, code) {
		return function(error) {
			if (!error.returnCode) {
				error.returnCode = ResponseHelper.RETURN_CODE.INTERNAL_ERROR;
			}
			if (!error.message) {
				error.message = ResponseHelper.MESSAGE.UNDEFINED_ERROR;
			}
			if (!error.severity) {
				error.severity = ResponseHelper.SEVERITY.ERROR;
			}

			res.status(code || ResponseHelper.HTTP_CODE.INTERNAL_ERROR).json(error);
		}
	}

	/**
	* Que faire en cas de succès
	* @param res la réponse HTTP
	* @param data la donnée à renvoyer
	*/
	onSuccess(res, code){
		return function(data) {
			if (!data.returnCode) {
				data.returnCode = ResponseHelper.RETURN_CODE.SUCCESS;
			}
			if (!data.message) {
				data.message = ResponseHelper.MESSAGE.SUCCESS;
			}
			if (!data.severity) {
				data.severity = ResponseHelper.SEVERITY.SUCCESS;
			}
			if (!data.data) {
				data.data = null;
			}
			if (!data.additionalMessage) {
				data.additionalMessage = null;
			}

			res.status(code || ResponseHelper.HTTP_CODE.SUCCESS).json(data);
		}
	}

}
