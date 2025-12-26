import {
	INodeProperties,
} from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'contact',
				],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Read contact details',
				action: 'Get a contact',
			},
			{
				name: 'Save',
				value: 'save',
				description: 'Save contact details',
				action: 'Save a contact',
			},
		],
		default: 'save',
	},
];

export const contactFields: INodeProperties[] = [
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'get',
				],
				resource: [
					'contact',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'save',
				],
				resource: [
					'contact',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'save',
				],
				resource: [
					'contact',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'save',
				],
				resource: [
					'contact',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Address 1',
		name: 'address1',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'save',
				],
				resource: [
					'contact',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'City',
		name: 'city',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'save',
				],
				resource: [
					'contact',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Country',
		name: 'country',
		type: 'string',
		required: true,
		description: 'Two-letter country code (ISO 3166-1 alpha-2)',
		displayOptions: {
			show: {
				operation: [
					'save',
				],
				resource: [
					'contact',
				],
			},
		},
		default: '',
		placeholder: 'US',
	},
	{
		displayName: 'Phone',
		name: 'phone',
		type: 'string',
		required: true,
		description: 'Phone number in international format (+1.123456789)',
		displayOptions: {
			show: {
				operation: [
					'save',
				],
				resource: [
					'contact',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: [
					'save',
				],
				resource: [
					'contact',
				],
			},
		},
		options: [
			{
				displayName: 'Organization',
				name: 'organization',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Address 2',
				name: 'address2',
				type: 'string',
				default: '',
			},
			{
				displayName: 'State/Province',
				name: 'stateProvince',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Postal Code',
				name: 'postalCode',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Phone Ext',
				name: 'phoneExt',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Fax',
				name: 'fax',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Fax Ext',
				name: 'faxExt',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Tax Number',
				name: 'taxNumber',
				type: 'string',
				default: '',
			},
		],
	},
];
