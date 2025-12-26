import {
	INodeProperties,
} from 'n8n-workflow';

export const asyncOperationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'asyncOperation',
				],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Obtain async operation details',
				action: 'Get an async operation',
			},
		],
		default: 'get',
	},
];

export const asyncOperationFields: INodeProperties[] = [
	{
		displayName: 'Operation ID',
		name: 'operationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'get',
				],
				resource: [
					'asyncOperation',
				],
			},
		},
		default: '',
	},
];
