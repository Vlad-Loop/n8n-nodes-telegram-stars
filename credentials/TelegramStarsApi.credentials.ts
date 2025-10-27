import {
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class TelegramStarsApi implements ICredentialType {
	name = 'telegramStarsApi';
	displayName = 'Telegram Stars API';
	documentationUrl = 'https://core.telegram.org/bots/api';
	icon: Icon = 'file:telegram-stars.svg';
	
	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'Chat with the <a href="https://telegram.me/botfather">bot father</a> to obtain the access token',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.telegram.org',
			description: 'Base URL for Telegram Bot API',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}/bot{{$credentials.accessToken}}',
			url: '/getMe',
		},
	};
}

