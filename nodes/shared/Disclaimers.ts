import { INodeProperties } from 'n8n-workflow';

const disclaimerBlocks: INodeProperties[] = [
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

export { disclaimerBlocks };