import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SpaceshipApi implements ICredentialType {
	name = 'spaceshipApi';
	displayName = 'Spaceship API';
	documentationUrl = 'https://docs.spaceship.dev/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'API Secret',
			name: 'apiSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
	];
}
