# n8n-nodes-telegram-stars

<div align="center">

[🇺🇸 English](https://github.com/Vlad-Loop/n8n-nodes-telegram-stars/blob/master/README.md) | 🇷🇺 Русский

</div>

[![npm version](https://img.shields.io/npm/v/n8n-nodes-telegram-stars.svg)](https://www.npmjs.com/package/n8n-nodes-telegram-stars)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Кастомная нода для n8n, которая позволяет работать с платежами Telegram Stars через Telegram Bot API.

**Почему появилась данная нода:** в Telegram нодах, которые поддерживаются официально в n8n, нет возможности по обработке платежей. При этом, если вы планируете внедрить в своего Telegram бота прием платежей за цифровые услуги, то кроме использования Stars вы ничего другого использовать не можете. Подробнее можно прочитать тут: [Bot Payments API for Digital Goods and Services](https://core.telegram.org/bots/payments-stars#faq)

![Telegram Stars node](https://raw.githubusercontent.com/Vlad-Loop/n8n-nodes-telegram-stars/master/screenshots/screen-1.png)

## 🌟 Поддерживаемые возможности

- **Send Invoice** - Отправка счета для оплаты в Telegram Stars
- **Answer Pre-Checkout Query** - Ответ на запросы pre-checkout
- **Refund Star Payment** - Возврат успешного платежа в Telegram Stars
- **Get Star Transactions** - Получение списка транзакций Telegram Stars
- **Get Bot Stars Balance** - Получение текущего баланса Stars выбранного бота Telegram

## 📦 Быстрая установка

### Через Community Nodes (рекомендуется)

1. Откройте n8n
2. Перейдите в **Settings** > **Community Nodes**
3. Нажмите **Install**
4. Введите `n8n-nodes-telegram-stars`
5. Нажмите **Install**

### Через локальную разработку / запуск

1. Скачайте репозиторий
2. В репозитории выполните следующие команды:
```bash
npm install
npm run build
npm link
```

3. В поднятом локально n8n:
```bash
npm i -g n8n # если ещё не установлен

# Если ещё никогда не запускали n8n на своей системе - запустите командой "n8n"
# Это создаст папку .n8n в домашней директории

cd ~/.n8n
mkdir custom && cd custom
npm init -y
npm link n8n-nodes-telegram-stars

# Запустить n8n
n8n
```

## 🔑 Настройка

1. Получите Bot Token у [@BotFather](https://t.me/BotFather)
2. В n8n создайте credential типа **Telegram Stars API**
3. Введите ваш Bot Token
4. Убедитесь, что бот имеет права на работу с платежами

## 📚 Документация

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram Stars Documentation](https://core.telegram.org/bots/payments)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)

## ⚠️ Дисклаймер

> [!WARNING]
> Это хобби-проект, который не претендует на стабильность. Используйте на свой страх и риск. Автор не несет ответственности за любые финансовые потери или проблемы, связанные с использованием данного узла.

### Требования безопасности:
- Никогда не публикуйте Bot Token в открытом доступе
- Используйте HTTPS для всех webhook URL
- Регулярно проверяйте логи на предмет подозрительной активности
- Убедитесь, что ваша деятельность соответствует применимым законам

## 🤝 Вклад в проект

Вклад приветствуется! Смотрите [code of conduct](https://github.com/Vlad-Loop/n8n-nodes-telegram-stars/blob/master/CODE_OF_CONDUCT.md) для правил поведения.

1. Форкните репозиторий
2. Создайте ветку для ваших изменений
3. Внесите изменения и протестируйте их
4. Создайте Pull Request

## 💬 Поддержка и связь

- **Автор**: https://t.me/vlad_loop
- **Issues**: [GitHub Issues](https://github.com/Vlad-Loop/n8n-nodes-telegram-stars/issues)
- **Community Nodes**: [n8n Community](https://community.n8n.io/)

## 📄 Лицензия

MIT License - см. [LICENSE](https://github.com/Vlad-Loop/n8n-nodes-telegram-stars/blob/master/LICENSE) для подробностей.
