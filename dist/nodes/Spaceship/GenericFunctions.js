"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spaceshipApiRequest = spaceshipApiRequest;
exports.spaceshipApiRequestAllItems = spaceshipApiRequestAllItems;
function spaceshipApiRequest(method_1, endpoint_1) {
    return __awaiter(this, arguments, void 0, function* (method, endpoint, body = {}, qs = {}, uri) {
        var _a;
        const credentials = yield this.getCredentials('spaceshipApi');
        const options = {
            headers: {
                'X-Api-Key': credentials.apiKey,
                'X-Api-Secret': credentials.apiSecret,
                'Content-Type': 'application/json',
            },
            method,
            body,
            qs,
            uri: uri || `https://spaceship.dev/api${endpoint}`,
            json: true,
        };
        if (!Object.keys(body).length) {
            delete options.body;
        }
        try {
            const response = yield this.helpers.request(Object.assign(Object.assign({}, options), { resolveWithFullResponse: true, simple: false }));
            if (response.statusCode >= 400) {
                const errorCode = response.headers['spaceship-error-code'];
                const message = ((_a = response.body) === null || _a === void 0 ? void 0 : _a.detail) || response.statusMessage || 'Unknown Error';
                throw new Error(`Spaceship API Error [${errorCode || response.statusCode}]: ${message}`);
            }
            if (response.statusCode === 202) {
                const operationId = response.headers['spaceship-async-operationid'];
                return Object.assign({ operationId, status: 'accepted' }, response.body);
            }
            return response.body;
        }
        catch (error) {
            throw error;
        }
    });
}
function spaceshipApiRequestAllItems(method_1, endpoint_1) {
    return __awaiter(this, arguments, void 0, function* (method, endpoint, body = {}, qs = {}) {
        const returnData = [];
        let responseData;
        qs.take = 100;
        qs.skip = 0;
        do {
            responseData = yield spaceshipApiRequest.call(this, method, endpoint, body, qs);
            returnData.push.apply(returnData, responseData.items);
            qs.skip += qs.take;
        } while (responseData.items && responseData.items.length >= qs.take);
        return returnData;
    });
}
//# sourceMappingURL=GenericFunctions.js.map