import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	spaceshipApiRequest,
	spaceshipApiRequestAllItems,
} from './GenericFunctions';

import { domainFields, domainOperations } from './descriptions/DomainDescription';
import { contactFields, contactOperations } from './descriptions/ContactDescription';
import { contactAttributeFields, contactAttributeOperations } from './descriptions/ContactAttributeDescription';
import { dnsRecordFields, dnsRecordOperations } from './descriptions/DnsRecordDescription';
import { sellerHubFields, sellerHubOperations } from './descriptions/SellerHubDescription';
import { asyncOperationFields, asyncOperationOperations } from './descriptions/AsyncOperationDescription';

export class Spaceship implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Spaceship',
		name: 'spaceship',
		icon: 'file:spaceship.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Interact with Spaceship.com API',
		defaults: {
			name: 'Spaceship',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'spaceshipApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Async Operation',
						value: 'asyncOperation',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Contact Attribute',
						value: 'contactAttribute',
					},
					{
						name: 'DNS Record',
						value: 'dnsRecord',
					},
					{
						name: 'Domain',
						value: 'domain',
					},
					{
						name: 'SellerHub',
						value: 'sellerHub',
					},
				],
				default: 'domain',
			},
			...domainOperations,
			...domainFields,
			...contactOperations,
			...contactFields,
			...contactAttributeOperations,
			...contactAttributeFields,
			...dnsRecordOperations,
			...dnsRecordFields,
			...sellerHubOperations,
			...sellerHubFields,
			...asyncOperationOperations,
			...asyncOperationFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let responseData;

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'domain') {
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const options = this.getNodeParameter('options', i, {});
						const qs: IDataObject = { ...options };

						if (returnAll) {
							responseData = await spaceshipApiRequestAllItems.call(this, 'GET', '/v1/domains', {}, qs);
						} else {
							qs.take = this.getNodeParameter('limit', i);
							qs.skip = 0;
							const res = await spaceshipApiRequest.call(this, 'GET', '/v1/domains', {}, qs);
							responseData = res.items;
						}
					} else if (operation === 'get') {
						const domain = this.getNodeParameter('domainName', i);
						responseData = await spaceshipApiRequest.call(this, 'GET', `/v1/domains/${domain}`);
					} else if (operation === 'delete') {
						const domain = this.getNodeParameter('domainName', i);
						responseData = await spaceshipApiRequest.call(this, 'DELETE', `/v1/domains/${domain}`);
					} else if (operation === 'checkAvailability') {
						const domains = (this.getNodeParameter('domains', i) as string).split(',').map(d => d.trim());
						responseData = await spaceshipApiRequest.call(this, 'POST', '/v1/domains/available', { domains });
					} else if (operation === 'register') {
						const domain = this.getNodeParameter('domainName', i);
						const contacts = {
							registrant: this.getNodeParameter('registrantContactId', i),
						} as IDataObject;
						const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;
						if (additionalOptions.adminContactId) (contacts as IDataObject).admin = additionalOptions.adminContactId;
						if (additionalOptions.techContactId) (contacts as IDataObject).tech = additionalOptions.techContactId;
						if (additionalOptions.billingContactId) (contacts as IDataObject).billing = additionalOptions.billingContactId;
						
						const body: IDataObject = {
							years: this.getNodeParameter('years', i),
							contacts,
						};
						if (additionalOptions.autoRenew !== undefined) body.autoRenew = additionalOptions.autoRenew;
						if (additionalOptions.privacyLevel) {
							body.privacyProtection = { level: additionalOptions.privacyLevel, userConsent: true };
						}
						responseData = await spaceshipApiRequest.call(this, 'POST', `/v1/domains/${domain}`, body);
					} else if (operation === 'renew') {
						const domain = this.getNodeParameter('domainName', i);
						const body = { years: this.getNodeParameter('years', i) };
						responseData = await spaceshipApiRequest.call(this, 'POST', `/v1/domains/${domain}/renew`, body);
					} else if (operation === 'restore') {
						const domain = this.getNodeParameter('domainName', i);
						responseData = await spaceshipApiRequest.call(this, 'POST', `/v1/domains/${domain}/restore`);
					} else if (operation === 'updateAutorenewal') {
						const domain = this.getNodeParameter('domainName', i);
						const isEnabled = this.getNodeParameter('enabled', i);
						responseData = await spaceshipApiRequest.call(this, 'PUT', `/v1/domains/${domain}/autorenew`, { isEnabled });
					} else if (operation === 'updateNameservers') {
						const domain = this.getNodeParameter('domainName', i);
						const hosts = (this.getNodeParameter('nameservers', i) as string).split(',').map(n => n.trim());
						responseData = await spaceshipApiRequest.call(this, 'PUT', `/v1/domains/${domain}/nameservers`, { provider: 'custom', hosts });
					} else if (operation === 'updateTransferLock') {
						const domain = this.getNodeParameter('domainName', i);
						const isLocked = this.getNodeParameter('locked', i);
						responseData = await spaceshipApiRequest.call(this, 'PUT', `/v1/domains/${domain}/transfer-lock`, { isLocked });
					} else if (operation === 'getAuthCode') {
						const domain = this.getNodeParameter('domainName', i);
						responseData = await spaceshipApiRequest.call(this, 'GET', `/v1/domains/${domain}/auth-code`);
					} else if (operation === 'getTransferInfo') {
						const domain = this.getNodeParameter('domainName', i);
						responseData = await spaceshipApiRequest.call(this, 'GET', `/v1/domains/${domain}/transfer`);
					} else if (operation === 'updateEmailProtection') {
						const domain = this.getNodeParameter('domainName', i);
						const contactForm = this.getNodeParameter('enabled', i);
						responseData = await spaceshipApiRequest.call(this, 'PUT', `/v1/domains/${domain}/email-protection`, { contactForm });
					} else if (operation === 'updatePrivacy') {
						const domain = this.getNodeParameter('domainName', i);
						const privacyLevel = this.getNodeParameter('privacyLevel', i);
						responseData = await spaceshipApiRequest.call(this, 'PUT', `/v1/domains/${domain}/privacy`, { privacyLevel, userConsent: true });
					} else if (operation === 'updateContacts') {
						const domain = this.getNodeParameter('domainName', i);
						const body: IDataObject = {
							registrant: this.getNodeParameter('registrantContactId', i),
						};
						const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;
						if (additionalOptions.adminContactId) (body as IDataObject).admin = additionalOptions.adminContactId;
						if (additionalOptions.techContactId) (body as IDataObject).tech = additionalOptions.techContactId;
						if (additionalOptions.billingContactId) (body as IDataObject).billing = additionalOptions.billingContactId;
						responseData = await spaceshipApiRequest.call(this, 'PUT', `/v1/domains/${domain}/contacts`, body);
					} else if (operation === 'transfer') {
						const domain = this.getNodeParameter('domainName', i);
						const body: IDataObject = {
							authCode: this.getNodeParameter('authCode', i),
							contacts: {
								registrant: this.getNodeParameter('registrantContactId', i),
							},
						};
						const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;
						if (additionalOptions.adminContactId) (body.contacts as IDataObject).admin = additionalOptions.adminContactId;
						if (additionalOptions.techContactId) (body.contacts as IDataObject).tech = additionalOptions.techContactId;
						if (additionalOptions.billingContactId) (body.contacts as IDataObject).billing = additionalOptions.billingContactId;
						if (additionalOptions.autoRenew !== undefined) body.autoRenew = additionalOptions.autoRenew;
						if (additionalOptions.privacyLevel) {
							body.privacyProtection = { level: additionalOptions.privacyLevel, userConsent: true };
						}
						responseData = await spaceshipApiRequest.call(this, 'POST', `/v1/domains/${domain}/transfer`, body);
					}
				} else if (resource === 'contact') {
					if (operation === 'save') {
						const body: IDataObject = {
							firstName: this.getNodeParameter('firstName', i),
							lastName: this.getNodeParameter('lastName', i),
							email: this.getNodeParameter('email', i),
							address1: this.getNodeParameter('address1', i),
							city: this.getNodeParameter('city', i),
							country: this.getNodeParameter('country', i),
							phone: this.getNodeParameter('phone', i),
						};
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await spaceshipApiRequest.call(this, 'PUT', '/v1/contacts', body);
					} else if (operation === 'get') {
						const contactId = this.getNodeParameter('contactId', i);
						responseData = await spaceshipApiRequest.call(this, 'GET', `/v1/contacts/${contactId}`);
					}
				} else if (resource === 'contactAttribute') {
					const contactId = this.getNodeParameter('contactId', i);
					if (operation === 'get') {
						responseData = await spaceshipApiRequest.call(this, 'GET', `/v1/contacts/attributes/${contactId}`);
					} else if (operation === 'save') {
						const attributeData = this.getNodeParameter('attributes', i) as any;
						const attributes = attributeData.attribute.map((a: any) => ({
							name: a.name,
							value: a.value,
						}));
						responseData = await spaceshipApiRequest.call(this, 'PUT', '/v1/contacts/attributes', { contact: contactId, attributes });
					}
				} else if (resource === 'dnsRecord') {
					if (operation === 'getAll') {
						const domain = this.getNodeParameter('domainName', i);
						const returnAll = this.getNodeParameter('returnAll', i);
						const endpoint = `/v1/dns/records/${domain}`;
						if (returnAll) {
							responseData = await spaceshipApiRequestAllItems.call(this, 'GET', endpoint);
						} else {
							const qs = { take: this.getNodeParameter('limit', i), skip: 0 };
							const res = await spaceshipApiRequest.call(this, 'GET', endpoint, {}, qs);
							responseData = res.items;
						}
					} else if (operation === 'save') {
						const domain = this.getNodeParameter('domainName', i);
						const force = this.getNodeParameter('force', i);
						const records = this.getNodeParameter('records', i) as any;
						const items = records.record.map((r: any) => ({
							type: r.type,
							name: r.name,
							ttl: r.ttl,
							address: (r.type === 'A' || r.type === 'AAAA') ? r.value : undefined,
							cname: r.type === 'CNAME' ? r.value : undefined,
							exchange: r.type === 'MX' ? r.value : undefined,
							preference: r.type === 'MX' ? r.priority : undefined,
							value: r.type === 'TXT' ? r.value : undefined,
							aliasName: r.type === 'ALIAS' ? r.value : undefined,
							nameserver: r.type === 'NS' ? r.value : undefined,
							pointer: r.type === 'PTR' ? r.value : undefined,
						}));
						responseData = await spaceshipApiRequest.call(this, 'PUT', `/v1/dns/records/${domain}`, { force, items });
					} else if (operation === 'delete') {
						const domain = this.getNodeParameter('domainName', i);
						const records = this.getNodeParameter('records', i) as any;
						const items = records.record.map((r: any) => ({
							type: r.type,
							name: r.name,
							address: (r.type === 'A' || r.type === 'AAAA') ? r.value : undefined,
							cname: r.type === 'CNAME' ? r.value : undefined,
							exchange: r.type === 'MX' ? r.value : undefined,
							preference: r.type === 'MX' ? r.priority : undefined,
							value: r.type === 'TXT' ? r.value : undefined,
							aliasName: r.type === 'ALIAS' ? r.value : undefined,
							nameserver: r.type === 'NS' ? r.value : undefined,
							pointer: r.type === 'PTR' ? r.value : undefined,
						}));
						responseData = await spaceshipApiRequest.call(this, 'DELETE', `/v1/dns/records/${domain}`, items);
					}
				} else if (resource === 'sellerHub') {
					const domainName = this.getNodeParameter('domainName', i, '') as string;
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						if (returnAll) {
							responseData = await spaceshipApiRequestAllItems.call(this, 'GET', '/v1/sellerhub/domains');
						} else {
							const qs = { take: this.getNodeParameter('limit', i), skip: 0 };
							const res = await spaceshipApiRequest.call(this, 'GET', '/v1/sellerhub/domains', {}, qs);
							responseData = res.items;
						}
					} else if (operation === 'create') {
						const price = this.getNodeParameter('price', i);
						responseData = await spaceshipApiRequest.call(this, 'POST', '/v1/sellerhub/domains', { domainName, price });
					} else if (operation === 'get') {
						responseData = await spaceshipApiRequest.call(this, 'GET', `/v1/sellerhub/domains/${domainName}`);
					} else if (operation === 'update') {
						const price = this.getNodeParameter('price', i);
						responseData = await spaceshipApiRequest.call(this, 'PUT', `/v1/sellerhub/domains/${domainName}`, { price });
					} else if (operation === 'delete') {
						responseData = await spaceshipApiRequest.call(this, 'DELETE', `/v1/sellerhub/domains/${domainName}`);
					} else if (operation === 'getVerificationRecords') {
						responseData = await spaceshipApiRequest.call(this, 'GET', `/v1/sellerhub/domains/${domainName}/verification-records`);
					}
				} else if (resource === 'asyncOperation') {
					if (operation === 'get') {
						const operationId = this.getNodeParameter('operationId', i);
						responseData = await spaceshipApiRequest.call(this, 'GET', `/v1/async-operations/${operationId}`);
					}
				}

				const executionData = this.helpers.returnJsonArray(responseData);
				returnData.push.apply(returnData, executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
