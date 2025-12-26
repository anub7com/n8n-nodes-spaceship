import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	IRequestOptions,
	IHttpRequestMethods,
} from 'n8n-workflow';

export async function spaceshipApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: any = {},
	qs: IDataObject = {},
	uri?: string,
): Promise<any> {
	const credentials = await this.getCredentials('spaceshipApi');

	const options: IRequestOptions = {
		headers: {
			'X-Api-Key': credentials.apiKey as string,
			'X-Api-Secret': credentials.apiSecret as string,
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
		const response = await this.helpers.request({ ...options, resolveWithFullResponse: true, simple: false });
		
		if (response.statusCode >= 400) {
			const errorCode = response.headers['spaceship-error-code'];
			const message = response.body?.detail || response.statusMessage || 'Unknown Error';
			throw new Error(`Spaceship API Error [${errorCode || response.statusCode}]: ${message}`);
		}

		if (response.statusCode === 202) {
			const operationId = response.headers['spaceship-async-operationid'];
			return {
				operationId,
				status: 'accepted',
				...response.body,
			};
		}

		return response.body;
	} catch (error) {
		throw error;
	}
}

export async function spaceshipApiRequestAllItems(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: any = {},
	qs: IDataObject = {},
): Promise<any[]> {
	const returnData: any[] = [];
	let responseData;

	qs.take = 100;
	qs.skip = 0;

	do {
		responseData = await spaceshipApiRequest.call(this, method, endpoint, body, qs);
		returnData.push.apply(returnData, responseData.items);
		qs.skip += qs.take;
	} while (responseData.items && responseData.items.length >= qs.take);

	return returnData;
}
