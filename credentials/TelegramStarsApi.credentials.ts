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
		{
			displayName:
				'<b>This is not an official Community Node!</b><br/>All rights to trademarks, logos and other designations belong to their legal owners. This project is not an official Telegram product and was created by an independent developer for non-commercial purposes.',
			name: 'unofficialWarning',
			type: 'notice',
			default: '',
		},
		{
			displayName:
				'<b>Disclaimer</b><br/>This software is provided "as is", without any express or implied warranties, including, but not limited to, the warranty of merchantability or fitness for a particular purpose. The author is not responsible for any losses, including lost profits, arising from the use of this software. Use at your own risk.',
			name: 'disclaimer',
			type: 'notice',
			default: '',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}/bot{{$credentials.accessToken}}',
			url: '/getMe',
		},
	};
}

