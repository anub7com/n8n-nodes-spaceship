import {
	INodeProperties,
} from 'n8n-workflow';

export const contactAttributeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'contactAttribute',
				],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Read attribute details by contact ID',
				action: 'Get contact attributes',
			},
			{
				name: 'Save',
				value: 'save',
				description: 'Save contact attributes',
				action: 'Save contact attributes',
			},
		],
		default: 'save',
	},
];

export const contactAttributeFields: INodeProperties[] = [
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'contactAttribute',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Attributes',
		name: 'attributes',
		type: 'fixedCollection',
		placeholder: 'Add Attribute',
		displayOptions: {
			show: {
				operation: [
					'save',
				],
				resource: [
					'contactAttribute',
				],
			},
		},
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		options: [
			{
				displayName: 'Attribute',
				name: 'attribute',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
					},
				],
			},
		],
	},
];
