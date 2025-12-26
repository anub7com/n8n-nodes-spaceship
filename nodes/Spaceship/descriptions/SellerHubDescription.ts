import {
	INodeProperties,
} from 'n8n-workflow';

export const sellerHubOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'sellerHub',
				],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a SellerHub domain',
				action: 'Create a sellerhub domain',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a SellerHub domain',
				action: 'Delete a sellerhub domain',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a specific SellerHub domain',
				action: 'Get a sellerhub domain',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get SellerHub domains list',
				action: 'Get all sellerhub domains',
			},
			{
				name: 'Get Verification Records',
				value: 'getVerificationRecords',
				description: 'Get verification records',
				action: 'Get verification records',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a SellerHub domain',
				action: 'Update a sellerhub domain',
			},
		],
		default: 'getAll',
	},
];

export const sellerHubFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                               sellerHub:getAll                             */
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
					'sellerHub',
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
					'sellerHub',
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
	/*                               sellerHub:get/create/etc                     */
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
					'create',
					'delete',
					'update',
					'getVerificationRecords',
				],
				resource: [
					'sellerHub',
				],
			},
		},
		default: '',
		placeholder: 'example.com',
	},
	{
		displayName: 'Price',
		name: 'price',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'create',
					'update',
				],
				resource: [
					'sellerHub',
				],
			},
		},
		default: 0,
	},
];
