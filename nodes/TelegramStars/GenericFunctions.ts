import { IDataObject, IHttpRequestMethods, IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions, NodeApiError } from 'n8n-workflow';

export async function telegramApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('telegramStarsApi');

	const options = {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body,
		qs: query,
		uri: `${credentials.baseUrl}/bot${credentials.accessToken}/${endpoint}`,
		json: true,
	};

	try {
		const response = await this.helpers.request(options);
		if (response.ok === false) {
			throw new NodeApiError(this.getNode(), {
				message: response.description || 'Telegram API request failed',
				description: response.description,
			});
		}
		return response.result;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as any);
	}
}

