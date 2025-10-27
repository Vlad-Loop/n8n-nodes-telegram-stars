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
			displayName: 'Prices',
			name: 'prices',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
			},
			required: true,
			displayOptions: {
				show: {
					operation: ['sendInvoice'],
				},
			},
			default: {},
			description: 'Price breakdown for the invoice',
			options: [
				{
					name: 'price',
					displayName: 'Price',
					values: [
						{
							displayName: 'Label',
							name: 'label',
							type: 'string',
							default: '',
							description: 'Portion label',
							required: true,
						},
						{
							displayName: 'Amount',
							name: 'amount',
							type: 'number',
							default: 1,
							description: 'Price of the product in the smallest units of the currency',
							required: true,
						},
					],
				},
			],
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
						displayName: 'Max Tip Amount',
						name: 'max_tip_amount',
						type: 'number',
						default: 0,
						description: 'The maximum accepted amount for tips in the smallest currency units',
					},
					{
						displayName: 'Suggested Tip Amounts',
						name: 'suggested_tip_amounts',
						type: 'string',
						default: '',
						description: 'JSON array of suggested tip amounts. Example: [10,20,50,100].',
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
						displayName: 'Need Name',
						name: 'need_name',
						type: 'boolean',
						default: false,
						description: 'Whether you require the user\'s full name',
					},
					{
						displayName: 'Need Phone Number',
						name: 'need_phone_number',
						type: 'boolean',
						default: false,
						description: 'Whether you require the user\'s phone number',
					},
					{
						displayName: 'Need Email',
						name: 'need_email',
						type: 'boolean',
						default: false,
						description: 'Whether you require the user\'s email address',
					},
					{
						displayName: 'Need Shipping Address',
						name: 'need_shipping_address',
						type: 'boolean',
						default: false,
						description: 'Whether you require the user\'s shipping address',
					},
					{
						displayName: 'Send Phone Number to Provider',
						name: 'send_phone_number_to_provider',
						type: 'boolean',
						default: false,
						description: 'Whether the user\'s phone number should be sent to the provider',
					},
					{
						displayName: 'Send Email to Provider',
						name: 'send_email_to_provider',
						type: 'boolean',
						default: false,
						description: 'Whether the user\'s email address should be sent to the provider',
					},
					{
						displayName: 'Is Flexible',
						name: 'is_flexible',
						type: 'boolean',
						default: false,
						description: 'Whether the final price depends on the shipping method',
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
				const pricesData = this.getNodeParameter('prices', i) as {
					price?: Array<{ label: string; amount: number }>;
				};
				const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
					[key: string]: any;
				};

			// Convert prices from fixedCollection format to Telegram API format
			const prices = pricesData.price || [];
			
			if (prices.length === 0) {
				throw new NodeOperationError(
					this.getNode(),
					'At least one price item is required',
					{ itemIndex: i },
				);
			}

			// Validate that all prices have required fields
			const validatedPrices = prices.map((price, index) => {
				if (!price.label || price.label.trim() === '') {
					throw new NodeOperationError(
						this.getNode(),
						`Price item ${index + 1} must have a label`,
						{ itemIndex: i },
					);
				}
				if (!price.amount || price.amount <= 0) {
					throw new NodeOperationError(
						this.getNode(),
						`Price item ${index + 1} must have a positive amount`,
						{ itemIndex: i },
					);
				}
				return {
					label: price.label.trim(),
					amount: Math.floor(price.amount), // Ensure amount is integer
				};
			});

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
						if (
							key === 'suggested_tip_amounts' &&
							typeof additionalFields[key] === 'string'
						) {
						try {
							body[key] = JSON.parse(additionalFields[key] as string);
						} catch (error) {
							throw new NodeOperationError(
								this.getNode(),
								`Invalid JSON in ${key} field: ${(error as Error).message}`,
								{ itemIndex: i },
							);
						}
						} else if (additionalFields[key] !== '' && additionalFields[key] !== 0) {
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

