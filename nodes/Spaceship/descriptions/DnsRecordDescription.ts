import {
	INodeProperties,
} from 'n8n-workflow';

export const dnsRecordOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'dnsRecord',
				],
			},
		},
		options: [
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete resource records',
				action: 'Delete DNS records',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get domain resource records list',
				action: 'Get all DNS records',
			},
			{
				name: 'Save',
				value: 'save',
				description: 'Add or update resource records',
				action: 'Save DNS records',
			},
		],
		default: 'getAll',
	},
];

export const dnsRecordFields: INodeProperties[] = [
	{
		displayName: 'Domain Name',
		name: 'domainName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'dnsRecord',
				],
			},
		},
		default: '',
		placeholder: 'example.com',
	},

	/* -------------------------------------------------------------------------- */
	/*                               dnsRecord:getAll                             */
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
					'dnsRecord',
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
					'dnsRecord',
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

	/* -------------------------------------------------------------------------- */
	/*                               dnsRecord:save                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Force',
		name: 'force',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: [
					'save',
				],
				resource: [
					'dnsRecord',
				],
			},
		},
		default: false,
		description: 'Whether to overwrite existing records',
	},
	{
		displayName: 'Records',
		name: 'records',
		type: 'fixedCollection',
		required: true,
		placeholder: 'Add Record',
		displayOptions: {
			show: {
				operation: [
					'save',
					'delete',
				],
				resource: [
					'dnsRecord',
				],
			},
		},
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		options: [
			{
				displayName: 'Record',
				name: 'record',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{ name: 'A', value: 'A' },
							{ name: 'AAAA', value: 'AAAA' },
							{ name: 'CNAME', value: 'CNAME' },
							{ name: 'MX', value: 'MX' },
							{ name: 'TXT', value: 'TXT' },
							{ name: 'NS', value: 'NS' },
							{ name: 'SRV', value: 'SRV' },
						],
						default: 'A',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '@',
						description: 'The host name of the record (e.g. @ or www)',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'The value of the record (IP address, hostname, or text content)',
					},
					{
						displayName: 'TTL',
						name: 'ttl',
						type: 'number',
						default: 3600,
						displayOptions: {
							show: {
								'/operation': ['save'],
							},
						},
					},
					{
						displayName: 'Priority',
						name: 'priority',
						type: 'number',
						default: 10,
						displayOptions: {
							show: {
								type: ['MX', 'SRV'],
								'/operation': ['save'],
							},
						},
					},
				],
			},
		],
	},
];
