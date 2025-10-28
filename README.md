# n8n-nodes-telegram-stars

<div align="center">

🇺🇸 English | [🇷🇺 Русский](https://github.com/Vlad-Loop/n8n-nodes-telegram-stars/blob/master/ruREADME.md)

</div>

[![npm version](https://img.shields.io/npm/v/n8n-nodes-telegram-stars.svg)](https://www.npmjs.com/package/n8n-nodes-telegram-stars)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Custom n8n node that allows working with Telegram Stars payments through the Telegram Bot API.

**Why this node was created:** The official Telegram nodes supported in n8n do not have the ability to process payments. Moreover, if you plan to integrate payment acceptance for digital services into your Telegram bot, you cannot use anything other than Stars. You can read more here: [Bot Payments API for Digital Goods and Services](https://core.telegram.org/bots/payments-stars#faq)

![Telegram Stars node](https://raw.githubusercontent.com/Vlad-Loop/n8n-nodes-telegram-stars/master/screenshots/screen-1.png)

## 🌟 Supported Features

- **Send Invoice** - Send an invoice for payment in Telegram Stars
- **Answer Pre-Checkout Query** - Respond to pre-checkout queries
- **Refund Star Payment** - Refund a successful payment in Telegram Stars
- **Get Star Transactions** - Get the list of Telegram Star transactions
- **Get Bot Stars Balance** - Get the current bot's star balance

## 📦 Quick Installation

### Via Community Nodes (recommended)

1. Open n8n
2. Go to **Settings** > **Community Nodes**
3. Click **Install**
4. Enter `n8n-nodes-telegram-stars`
5. Click **Install**

### Via Local Development / Run

1. Clone the repository
2. In the repository, run the following commands:
```bash
npm install
npm run build
npm link
```

3. In your locally running n8n:
```bash
npm i -g n8n # if not already installed

# If you've never run n8n on your system before - run it with "n8n" command
# This will create a .n8n folder in your home directory

cd ~/.n8n
mkdir custom && cd custom
npm init -y
npm link n8n-nodes-telegram-stars

# Start n8n
n8n
```

## 🔑 Setup

1. Get Bot Token from [@BotFather](https://t.me/BotFather)
2. In n8n create a credential of type **Telegram Stars API**
3. Enter your Bot Token
4. Make sure the bot has permissions to work with payments

## 📚 Documentation

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram Stars Documentation](https://core.telegram.org/bots/payments)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)

## ⚠️ Disclaimer

> [!WARNING]
> This is a hobby project that does not claim stability. Use at your own risk. The author is not responsible for any financial losses or problems related to the use of this node.

### Security Requirements:
- Never publish Bot Token in public access
- Use HTTPS for all webhook URLs
- Regularly check logs for suspicious activity
- Make sure your activities comply with applicable laws

## 🤝 Contributing

Contributions are welcome! See the [code of conduct](https://github.com/Vlad-Loop/n8n-nodes-telegram-stars/blob/master/CODE_OF_CONDUCT.md) for behavior rules.

1. Fork the repository
2. Create a branch for your changes
3. Make changes and test them
4. Create a Pull Request

## 💬 Support and Contact

- **Author**: https://t.me/vlad_loop
- **Issues**: [GitHub Issues](https://github.com/Vlad-Loop/n8n-nodes-telegram-stars/issues)
- **Community Nodes**: [n8n Community](https://community.n8n.io/)

## 📄 License

MIT License - see [LICENSE](https://github.com/Vlad-Loop/n8n-nodes-telegram-stars/blob/master/LICENSE) for details.

