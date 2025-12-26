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
exports.Spaceship = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
const DomainDescription_1 = require("./descriptions/DomainDescription");
const ContactDescription_1 = require("./descriptions/ContactDescription");
const ContactAttributeDescription_1 = require("./descriptions/ContactAttributeDescription");
const DnsRecordDescription_1 = require("./descriptions/DnsRecordDescription");
const SellerHubDescription_1 = require("./descriptions/SellerHubDescription");
const AsyncOperationDescription_1 = require("./descriptions/AsyncOperationDescription");
class Spaceship {
    constructor() {
        this.description = {
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
                ...DomainDescription_1.domainOperations,
                ...DomainDescription_1.domainFields,
                ...ContactDescription_1.contactOperations,
                ...ContactDescription_1.contactFields,
                ...ContactAttributeDescription_1.contactAttributeOperations,
                ...ContactAttributeDescription_1.contactAttributeFields,
                ...DnsRecordDescription_1.dnsRecordOperations,
                ...DnsRecordDescription_1.dnsRecordFields,
                ...SellerHubDescription_1.sellerHubOperations,
                ...SellerHubDescription_1.sellerHubFields,
                ...AsyncOperationDescription_1.asyncOperationOperations,
                ...AsyncOperationDescription_1.asyncOperationFields,
            ],
        };
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = this.getInputData();
            const returnData = [];
            const resource = this.getNodeParameter('resource', 0);
            const operation = this.getNodeParameter('operation', 0);
            let responseData;
            for (let i = 0; i < items.length; i++) {
                try {
                    if (resource === 'domain') {
                        if (operation === 'getAll') {
                            const returnAll = this.getNodeParameter('returnAll', i);
                            const options = this.getNodeParameter('options', i, {});
                            const qs = Object.assign({}, options);
                            if (returnAll) {
                                responseData = yield GenericFunctions_1.spaceshipApiRequestAllItems.call(this, 'GET', '/v1/domains', {}, qs);
                            }
                            else {
                                qs.take = this.getNodeParameter('limit', i);
                                qs.skip = 0;
                                const res = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'GET', '/v1/domains', {}, qs);
                                responseData = res.items;
                            }
                        }
                        else if (operation === 'get') {
                            const domain = this.getNodeParameter('domainName', i);
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'GET', `/v1/domains/${domain}`);
                        }
                        else if (operation === 'delete') {
                            const domain = this.getNodeParameter('domainName', i);
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'DELETE', `/v1/domains/${domain}`);
                        }
                        else if (operation === 'checkAvailability') {
                            const domains = this.getNodeParameter('domains', i).split(',').map(d => d.trim());
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'POST', '/v1/domains/available', { domains });
                        }
                        else if (operation === 'register') {
                            const domain = this.getNodeParameter('domainName', i);
                            const contacts = {
                                registrant: this.getNodeParameter('registrantContactId', i),
                            };
                            const additionalOptions = this.getNodeParameter('additionalOptions', i, {});
                            if (additionalOptions.adminContactId)
                                contacts.admin = additionalOptions.adminContactId;
                            if (additionalOptions.techContactId)
                                contacts.tech = additionalOptions.techContactId;
                            if (additionalOptions.billingContactId)
                                contacts.billing = additionalOptions.billingContactId;
                            const body = {
                                years: this.getNodeParameter('years', i),
                                contacts,
                            };
                            if (additionalOptions.autoRenew !== undefined)
                                body.autoRenew = additionalOptions.autoRenew;
                            if (additionalOptions.privacyLevel) {
                                body.privacyProtection = { level: additionalOptions.privacyLevel, userConsent: true };
                            }
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'POST', `/v1/domains/${domain}`, body);
                        }
                        else if (operation === 'renew') {
                            const domain = this.getNodeParameter('domainName', i);
                            const body = { years: this.getNodeParameter('years', i) };
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'POST', `/v1/domains/${domain}/renew`, body);
                        }
                        else if (operation === 'restore') {
                            const domain = this.getNodeParameter('domainName', i);
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'POST', `/v1/domains/${domain}/restore`);
                        }
                        else if (operation === 'updateAutorenewal') {
                            const domain = this.getNodeParameter('domainName', i);
                            const isEnabled = this.getNodeParameter('enabled', i);
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'PUT', `/v1/domains/${domain}/autorenew`, { isEnabled });
                        }
                        else if (operation === 'updateNameservers') {
                            const domain = this.getNodeParameter('domainName', i);
                            const hosts = this.getNodeParameter('nameservers', i).split(',').map(n => n.trim());
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'PUT', `/v1/domains/${domain}/nameservers`, { provider: 'custom', hosts });
                        }
                        else if (operation === 'updateTransferLock') {
                            const domain = this.getNodeParameter('domainName', i);
                            const isLocked = this.getNodeParameter('locked', i);
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'PUT', `/v1/domains/${domain}/transfer-lock`, { isLocked });
                        }
                        else if (operation === 'getAuthCode') {
                            const domain = this.getNodeParameter('domainName', i);
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'GET', `/v1/domains/${domain}/auth-code`);
                        }
                        else if (operation === 'getTransferInfo') {
                            const domain = this.getNodeParameter('domainName', i);
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'GET', `/v1/domains/${domain}/transfer`);
                        }
                        else if (operation === 'updateEmailProtection') {
                            const domain = this.getNodeParameter('domainName', i);
                            const contactForm = this.getNodeParameter('enabled', i);
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'PUT', `/v1/domains/${domain}/email-protection`, { contactForm });
                        }
                        else if (operation === 'updatePrivacy') {
                            const domain = this.getNodeParameter('domainName', i);
                            const privacyLevel = this.getNodeParameter('privacyLevel', i);
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'PUT', `/v1/domains/${domain}/privacy`, { privacyLevel, userConsent: true });
                        }
                        else if (operation === 'updateContacts') {
                            const domain = this.getNodeParameter('domainName', i);
                            const body = {
                                registrant: this.getNodeParameter('registrantContactId', i),
                            };
                            const additionalOptions = this.getNodeParameter('additionalOptions', i, {});
                            if (additionalOptions.adminContactId)
                                body.admin = additionalOptions.adminContactId;
                            if (additionalOptions.techContactId)
                                body.tech = additionalOptions.techContactId;
                            if (additionalOptions.billingContactId)
                                body.billing = additionalOptions.billingContactId;
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'PUT', `/v1/domains/${domain}/contacts`, body);
                        }
                        else if (operation === 'transfer') {
                            const domain = this.getNodeParameter('domainName', i);
                            const body = {
                                authCode: this.getNodeParameter('authCode', i),
                                contacts: {
                                    registrant: this.getNodeParameter('registrantContactId', i),
                                },
                            };
                            const additionalOptions = this.getNodeParameter('additionalOptions', i, {});
                            if (additionalOptions.adminContactId)
                                body.contacts.admin = additionalOptions.adminContactId;
                            if (additionalOptions.techContactId)
                                body.contacts.tech = additionalOptions.techContactId;
                            if (additionalOptions.billingContactId)
                                body.contacts.billing = additionalOptions.billingContactId;
                            if (additionalOptions.autoRenew !== undefined)
                                body.autoRenew = additionalOptions.autoRenew;
                            if (additionalOptions.privacyLevel) {
                                body.privacyProtection = { level: additionalOptions.privacyLevel, userConsent: true };
                            }
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'POST', `/v1/domains/${domain}/transfer`, body);
                        }
                    }
                    else if (resource === 'contact') {
                        if (operation === 'save') {
                            const body = {
                                firstName: this.getNodeParameter('firstName', i),
                                lastName: this.getNodeParameter('lastName', i),
                                email: this.getNodeParameter('email', i),
                                address1: this.getNodeParameter('address1', i),
                                city: this.getNodeParameter('city', i),
                                country: this.getNodeParameter('country', i),
                                phone: this.getNodeParameter('phone', i),
                            };
                            const additionalFields = this.getNodeParameter('additionalFields', i, {});
                            Object.assign(body, additionalFields);
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'PUT', '/v1/contacts', body);
                        }
                        else if (operation === 'get') {
                            const contactId = this.getNodeParameter('contactId', i);
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'GET', `/v1/contacts/${contactId}`);
                        }
                    }
                    else if (resource === 'contactAttribute') {
                        const contactId = this.getNodeParameter('contactId', i);
                        if (operation === 'get') {
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'GET', `/v1/contacts/attributes/${contactId}`);
                        }
                        else if (operation === 'save') {
                            const attributeData = this.getNodeParameter('attributes', i);
                            const attributes = attributeData.attribute.map((a) => ({
                                name: a.name,
                                value: a.value,
                            }));
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'PUT', '/v1/contacts/attributes', { contact: contactId, attributes });
                        }
                    }
                    else if (resource === 'dnsRecord') {
                        if (operation === 'getAll') {
                            const domain = this.getNodeParameter('domainName', i);
                            const returnAll = this.getNodeParameter('returnAll', i);
                            const endpoint = `/v1/dns/records/${domain}`;
                            if (returnAll) {
                                responseData = yield GenericFunctions_1.spaceshipApiRequestAllItems.call(this, 'GET', endpoint);
                            }
                            else {
                                const qs = { take: this.getNodeParameter('limit', i), skip: 0 };
                                const res = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'GET', endpoint, {}, qs);
                                responseData = res.items;
                            }
                        }
                        else if (operation === 'save') {
                            const domain = this.getNodeParameter('domainName', i);
                            const force = this.getNodeParameter('force', i);
                            const records = this.getNodeParameter('records', i);
                            const items = records.record.map((r) => ({
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
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'PUT', `/v1/dns/records/${domain}`, { force, items });
                        }
                        else if (operation === 'delete') {
                            const domain = this.getNodeParameter('domainName', i);
                            const records = this.getNodeParameter('records', i);
                            const items = records.record.map((r) => ({
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
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'DELETE', `/v1/dns/records/${domain}`, items);
                        }
                    }
                    else if (resource === 'sellerHub') {
                        const domainName = this.getNodeParameter('domainName', i, '');
                        if (operation === 'getAll') {
                            const returnAll = this.getNodeParameter('returnAll', i);
                            if (returnAll) {
                                responseData = yield GenericFunctions_1.spaceshipApiRequestAllItems.call(this, 'GET', '/v1/sellerhub/domains');
                            }
                            else {
                                const qs = { take: this.getNodeParameter('limit', i), skip: 0 };
                                const res = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'GET', '/v1/sellerhub/domains', {}, qs);
                                responseData = res.items;
                            }
                        }
                        else if (operation === 'create') {
                            const price = this.getNodeParameter('price', i);
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'POST', '/v1/sellerhub/domains', { domainName, price });
                        }
                        else if (operation === 'get') {
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'GET', `/v1/sellerhub/domains/${domainName}`);
                        }
                        else if (operation === 'update') {
                            const price = this.getNodeParameter('price', i);
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'PUT', `/v1/sellerhub/domains/${domainName}`, { price });
                        }
                        else if (operation === 'delete') {
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'DELETE', `/v1/sellerhub/domains/${domainName}`);
                        }
                        else if (operation === 'getVerificationRecords') {
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'GET', `/v1/sellerhub/domains/${domainName}/verification-records`);
                        }
                    }
                    else if (resource === 'asyncOperation') {
                        if (operation === 'get') {
                            const operationId = this.getNodeParameter('operationId', i);
                            responseData = yield GenericFunctions_1.spaceshipApiRequest.call(this, 'GET', `/v1/async-operations/${operationId}`);
                        }
                    }
                    const executionData = this.helpers.returnJsonArray(responseData);
                    returnData.push.apply(returnData, executionData);
                }
                catch (error) {
                    if (this.continueOnFail()) {
                        returnData.push({ json: { error: error.message } });
                        continue;
                    }
                    throw error;
                }
            }
            return [returnData];
        });
    }
}
exports.Spaceship = Spaceship;
//# sourceMappingURL=Spaceship.node.js.map