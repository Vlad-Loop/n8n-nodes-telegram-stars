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
				'<b>Это не официальная Community Node!</b><br/>Все права на товарные знаки, логотипы и иные обозначения принадлежат их законным правообладателям. Настоящий проект не является официальным продуктом Telegram и создан независимым разработчиком в некоммерческих целях.',
			name: 'unofficialWarning',
			type: 'notice',
			default: '',
		},
		{
			displayName:
				'<b>Отказ от отвественности</b><br/>Это программное обеспечение предоставляется "как есть", без каких-либо явных или подразумеваемых гарантий, включая, но не ограничиваясь, гарантией товарной пригодности или пригодности для конкретной цели. Автор не несёт ответственности за любые убытки, включая упущенную выгоду, возникшие в результате использования этого ПО. Используется на ваш страх и риск.',
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

