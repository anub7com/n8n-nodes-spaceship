import { IExecuteFunctions, ILoadOptionsFunctions, IDataObject, IHttpRequestMethods } from 'n8n-workflow';
export declare function spaceshipApiRequest(this: IExecuteFunctions | ILoadOptionsFunctions, method: IHttpRequestMethods, endpoint: string, body?: any, qs?: IDataObject, uri?: string): Promise<any>;
export declare function spaceshipApiRequestAllItems(this: IExecuteFunctions, method: IHttpRequestMethods, endpoint: string, body?: any, qs?: IDataObject): Promise<any[]>;
