import {
	INodeProperties,
} from 'n8n-workflow';

export const domainOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'domain',
				],
			},
		},
		options: [
			{
				name: 'Check Availability',
				value: 'checkAvailability',
				description: 'Check availability of one or multiple domains',
				action: 'Check domain availability',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a domain',
				action: 'Delete a domain',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a domain',
				action: 'Get a domain',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Retrieve a list of domains',
				action: 'Get all domains',
			},
			{
				name: 'Get Auth Code',
				value: 'getAuthCode',
				description: 'Get auth code for domain transfer',
				action: 'Get domain auth code',
			},
			{
				name: 'Get Transfer Info',
				value: 'getTransferInfo',
				description: 'Get details of a domain transfer',
				action: 'Get transfer info',
			},
			{
				name: 'Register',
				value: 'register',
				description: 'Register a new domain',
				action: 'Register a domain',
			},
			{
				name: 'Renew',
				value: 'renew',
				description: 'Renew a domain',
				action: 'Renew a domain',
			},
			{
				name: 'Restore',
				value: 'restore',
				description: 'Restore a domain',
				action: 'Restore a domain',
			},
			{
				name: 'Transfer',
				value: 'transfer',
				description: 'Transfer a domain to Spaceship',
				action: 'Transfer a domain',
			},
			{
				name: 'Update Autorenewal',
				value: 'updateAutorenewal',
				description: 'Update domain autorenewal state',
				action: 'Update domain autorenewal',
			},
			{
				name: 'Update Contacts',
				value: 'updateContacts',
				description: 'Update domain contacts',
				action: 'Update domain contacts',
			},
			{
				name: 'Update Email Protection',
				value: 'updateEmailProtection',
				description: 'Update domain email protection preference',
				action: 'Update email protection',
			},
			{
				name: 'Update Nameservers',
				value: 'updateNameservers',
				description: 'Update domain nameservers',
				action: 'Update domain nameservers',
			},
			{
				name: 'Update Privacy',
				value: 'updatePrivacy',
				description: 'Update domain privacy preference',
				action: 'Update domain privacy',
			},
			{
				name: 'Update Transfer Lock',
				value: 'updateTransferLock',
				description: 'Update domain transfer lock',
				action: 'Update transfer lock',
			},
		],
		default: 'getAll',
	},
];

export const domainFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                 domain:getAll                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: [
					'getAll',
				],
				resource: [
					'domain',
				],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				operation: [
					'getAll',
				],
				resource: [
					'domain',
				],
				returnAll: [
					false,
				],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		default: 100,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				operation: [
					'getAll',
				],
				resource: [
					'domain',
				],
			},
		},
		options: [
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'options',
				options: [
					{ name: 'Name (Asc)', value: 'name' },
					{ name: 'Name (Desc)', value: '-name' },
					{ name: 'Registration Date (Asc)', value: 'registrationDate' },
					{ name: 'Registration Date (Desc)', value: '-registrationDate' },
					{ name: 'Expiration Date (Asc)', value: 'expirationDate' },
					{ name: 'Expiration Date (Desc)', value: '-expirationDate' },
				],
				default: 'name',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                 domain:get                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Domain Name',
		name: 'domainName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'get',
					'delete',
					'getAuthCode',
					'getTransferInfo',
					'updateAutorenewal',
					'updateEmailProtection',
					'updatePrivacy',
					'updateContacts',
					'updateNameservers',
					'renew',
					'restore',
					'transfer',
					'updateTransferLock',
				],
				resource: [
					'domain',
				],
			},
		},
		default: '',
		placeholder: 'example.com',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 domain:checkAvailability                   */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Domains',
		name: 'domains',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'checkAvailability',
				],
				resource: [
					'domain',
				],
			},
		},
		default: '',
		description: 'Comma-separated list of domains to check',
		placeholder: 'example1.com, example2.net',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 domain:register                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Domain Name',
		name: 'domainName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'register',
				],
				resource: [
					'domain',
				],
			},
		},
		default: '',
		placeholder: 'example.com',
	},
	{
		displayName: 'Years',
		name: 'years',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'register',
					'renew',
				],
				resource: [
					'domain',
				],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 10,
		},
		default: 1,
	},
	{
		displayName: 'Registrant Contact ID',
		name: 'registrantContactId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'register',
					'transfer',
					'updateContacts',
				],
				resource: [
					'domain',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Privacy Protection Level',
		name: 'privacyLevel',
		type: 'options',
		options: [
			{ name: 'High', value: 'high' },
			{ name: 'Redacted', value: 'redacted' },
			{ name: 'None', value: 'none' },
		],
		default: 'high',
		displayOptions: {
			show: {
				operation: [
					'updatePrivacy',
				],
				resource: [
					'domain',
				],
			},
		},
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				operation: [
					'register',
					'transfer',
					'updateContacts',
				],
				resource: [
					'domain',
				],
			},
		},
		options: [
			{
				displayName: 'Admin Contact ID',
				name: 'adminContactId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Tech Contact ID',
				name: 'techContactId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Billing Contact ID',
				name: 'billingContactId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Auto Renew',
				name: 'autoRenew',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Privacy Protection Level',
				name: 'privacyLevel',
				type: 'options',
				options: [
					{ name: 'High', value: 'high' },
					{ name: 'Redacted', value: 'redacted' },
					{ name: 'None', value: 'none' },
				],
				default: 'high',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                 domain:updateAutorenewal                   */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Enabled',
		name: 'enabled',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'updateAutorenewal',
					'updateEmailProtection',
				],
				resource: [
					'domain',
				],
			},
		},
		default: false,
	},

	/* -------------------------------------------------------------------------- */
	/*                                 domain:updateNameservers                   */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Domain Name',
		name: 'domainName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'updateNameservers',
				],
				resource: [
					'domain',
				],
			},
		},
		default: '',
		placeholder: 'example.com',
	},
	{
		displayName: 'Nameservers',
		name: 'nameservers',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'updateNameservers',
				],
				resource: [
					'domain',
				],
			},
		},
		default: '',
		description: 'Comma-separated list of nameservers',
		placeholder: 'ns1.spaceship.com, ns2.spaceship.com',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 domain:updateTransferLock                  */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Locked',
		name: 'locked',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'updateTransferLock',
				],
				resource: [
					'domain',
				],
			},
		},
		default: true,
	},

	/* -------------------------------------------------------------------------- */
	/*                                 domain:transfer                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Auth Code',
		name: 'authCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'transfer',
				],
				resource: [
					'domain',
				],
			},
		},
		default: '',
	},
];
