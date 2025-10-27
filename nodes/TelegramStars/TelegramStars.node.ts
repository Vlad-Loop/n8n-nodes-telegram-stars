import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import { telegramApiRequest } from './GenericFunctions';
import { disclaimerBlocks } from '../shared/Disclaimers';

export class TelegramStars implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Telegram Stars',
		name: 'telegramStars',
		icon: 'file:telegram-stars.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with Telegram Stars payments API',
		defaults: {
			name: 'Telegram Stars',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'telegramStarsApi',
				required: true,
			},
		],
		properties: [
			...disclaimerBlocks,
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Send Invoice',
						value: 'sendInvoice',
						description: 'Send an invoice for payment in Telegram Stars',
						action: 'Send an invoice',
					},
					{
						name: 'Answer Pre-Checkout Query',
						value: 'answerPreCheckoutQuery',
						description: 'Respond to pre-checkout queries',
						action: 'Answer pre-checkout query',
					},
					{
						name: 'Refund Star Payment',
						value: 'refundStarPayment',
						description: 'Refund a successful payment in Telegram Stars',
						action: 'Refund a star payment',
					},
					{
						name: 'Get Star Transactions',
						value: 'getStarTransactions',
						description: 'Get the list of Telegram Star transactions',
						action: 'Get star transactions',
					},
					{
						name: 'Get Bot Stars Balance',
						value: 'getBotStarsBalance',
						description: 'Get the current bot\'s star balance',
						action: 'Get bot stars balance',
					},
				],
				default: 'sendInvoice',
			},

			// Send Invoice Fields
			{
				displayName: 'Chat ID',
				name: 'chatId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['sendInvoice'],
					},
				},
				default: '',
				description: 'Unique identifier for the target chat or username of the target channel',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['sendInvoice'],
					},
				},
				default: '',
				description: 'Product name, 1-32 characters',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['sendInvoice'],
					},
				},
				default: '',
				description: 'Product description, 1-255 characters',
			},
			{
				displayName: 'Payload',
				name: 'payload',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['sendInvoice'],
					},
				},
				default: '',
				description: 'Bot-defined invoice payload, 1-128 bytes',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['sendInvoice'],
					},
				},
				default: 'XTR',
				description: 'Three-letter ISO 4217 currency code. Use "XTR" for Telegram Stars.',
			},
		{
			displayName: 'Price Label',
			name: 'priceLabel',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					operation: ['sendInvoice'],
				},
			},
			default: '',
			description: 'Portion label',
		},
		{
			displayName: 'Price Amount',
			name: 'priceAmount',
			type: 'number',
			required: true,
			displayOptions: {
				show: {
					operation: ['sendInvoice'],
				},
			},
			default: 1,
			description: 'Price of the product in the smallest units of the currency',
		},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: ['sendInvoice'],
					},
				},
				options: [
					{
						displayName: 'Message Thread ID',
						name: 'message_thread_id',
						type: 'number',
						default: 0,
						description: 'Unique identifier for the target message thread',
					},
					{
						displayName: 'Provider Data',
						name: 'provider_data',
						type: 'string',
						default: '',
						description: 'JSON-serialized data about the invoice',
					},
					{
						displayName: 'Photo URL',
						name: 'photo_url',
						type: 'string',
						default: '',
						description: 'URL of the product photo',
					},
					{
						displayName: 'Photo Size',
						name: 'photo_size',
						type: 'number',
						default: 0,
						description: 'Photo size in bytes',
					},
					{
						displayName: 'Photo Width',
						name: 'photo_width',
						type: 'number',
						default: 0,
						description: 'Photo width',
					},
					{
						displayName: 'Photo Height',
						name: 'photo_height',
						type: 'number',
						default: 0,
						description: 'Photo height',
					},
					{
						displayName: 'Disable Notification',
						name: 'disable_notification',
						type: 'boolean',
						default: false,
						description: 'Whether to send the message silently',
					},
					{
						displayName: 'Protect Content',
						name: 'protect_content',
						type: 'boolean',
						default: false,
						description: 'Whether to protect the content from forwarding and saving',
					},
					{
						displayName: 'Reply to Message ID',
						name: 'reply_to_message_id',
						type: 'number',
						default: 0,
						description: 'If the message is a reply, ID of the original message',
					},
					{
						displayName: 'Allow Sending Without Reply',
						name: 'allow_sending_without_reply',
						type: 'boolean',
						default: false,
						description: 'Whether the message should be sent even if the specified replied-to message is not found',
					},
				],
			},

			// Answer Pre-Checkout Query Fields
			{
				displayName: 'Pre-Checkout Query ID',
				name: 'preCheckoutQueryId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['answerPreCheckoutQuery'],
					},
				},
				default: '',
				description: 'Unique identifier for the query to be answered',
			},
			{
				displayName: 'OK',
				name: 'ok',
				type: 'boolean',
				required: true,
				displayOptions: {
					show: {
						operation: ['answerPreCheckoutQuery'],
					},
				},
				default: true,
				description: 'Whether everything is alright (True) or if there is an error (False)',
			},
			{
				displayName: 'Error Message',
				name: 'errorMessage',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['answerPreCheckoutQuery'],
						ok: [false],
					},
				},
				default: '',
				description: 'Required if ok is False. Error message in human readable form.',
			},

			// Refund Star Payment Fields
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['refundStarPayment'],
					},
				},
				default: '',
				description: 'Identifier of the user whose payment will be refunded',
			},
			{
				displayName: 'Telegram Payment Charge ID',
				name: 'telegramPaymentChargeId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['refundStarPayment'],
					},
				},
				default: '',
				description: 'Telegram payment identifier',
			},

			// Get Star Transactions Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: ['getStarTransactions'],
					},
				},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'Number of transactions to skip in the response',
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 100,
						description: 'The maximum number of transactions to be retrieved. Values between 1-100 are accepted.',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;

			if (operation === 'sendInvoice') {
				const chatId = this.getNodeParameter('chatId', i) as string;
				const title = this.getNodeParameter('title', i) as string;
				const description = this.getNodeParameter('description', i) as string;
				const payload = this.getNodeParameter('payload', i) as string;
				const currency = this.getNodeParameter('currency', i) as string;
				const priceLabel = this.getNodeParameter('priceLabel', i) as string;
				const priceAmount = this.getNodeParameter('priceAmount', i) as number;
				const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
					[key: string]: any;
				};

			// Validate price fields
			if (!priceLabel || priceLabel.trim() === '') {
				throw new NodeOperationError(
					this.getNode(),
					'Price label is required',
					{ itemIndex: i },
				);
			}
			if (!priceAmount || priceAmount <= 0) {
				throw new NodeOperationError(
					this.getNode(),
					'Price amount must be a positive number',
					{ itemIndex: i },
				);
			}

			// Create single price object
			const validatedPrices = [{
				label: priceLabel.trim(),
				amount: Math.floor(priceAmount), // Ensure amount is integer
			}];

					const body: any = {
						chat_id: chatId,
						title,
						description,
						payload,
						currency,
						prices: validatedPrices,
						provider_token: '', // Empty for Telegram Stars
					};

					// Add additional fields
					Object.keys(additionalFields).forEach((key) => {
						if (additionalFields[key] !== '' && additionalFields[key] !== 0) {
							body[key] = additionalFields[key];
						}
					});

					responseData = await telegramApiRequest.call(this, 'POST', 'sendInvoice', body);
				} else if (operation === 'answerPreCheckoutQuery') {
					const preCheckoutQueryId = this.getNodeParameter('preCheckoutQueryId', i) as string;
					const ok = this.getNodeParameter('ok', i) as boolean;

					const body: any = {
						pre_checkout_query_id: preCheckoutQueryId,
						ok,
					};

					if (!ok) {
						const errorMessage = this.getNodeParameter('errorMessage', i) as string;
						body.error_message = errorMessage;
					}

					responseData = await telegramApiRequest.call(
						this,
						'POST',
						'answerPreCheckoutQuery',
						body,
					);
				} else if (operation === 'refundStarPayment') {
					const userId = this.getNodeParameter('userId', i) as string;
					const telegramPaymentChargeId = this.getNodeParameter(
						'telegramPaymentChargeId',
						i,
					) as string;

					const body = {
						user_id: userId,
						telegram_payment_charge_id: telegramPaymentChargeId,
					};

					responseData = await telegramApiRequest.call(this, 'POST', 'refundStarPayment', body);
				} else if (operation === 'getStarTransactions') {
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
						[key: string]: any;
					};

					const body: any = {};

					if (additionalFields.offset) {
						body.offset = additionalFields.offset;
					}
					if (additionalFields.limit) {
						body.limit = additionalFields.limit;
					}

					responseData = await telegramApiRequest.call(this, 'POST', 'getStarTransactions', body);
				} else if (operation === 'getBotStarsBalance') {
					responseData = await telegramApiRequest.call(this, 'POST', 'getMyStarBalance', {});
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as any),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
		} catch (error) {
			if (this.continueOnFail()) {
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray({ error: (error as Error).message }),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
				continue;
			}
			throw error;
		}
		}

		return [returnData];
	}
}

