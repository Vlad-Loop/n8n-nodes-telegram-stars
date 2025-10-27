# n8n-nodes-telegram-stars

[![npm version](https://img.shields.io/npm/v/n8n-nodes-telegram-stars.svg)](https://www.npmjs.com/package/n8n-nodes-telegram-stars)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
Стабильная версия: ![version](https://img.shields.io/badge/version-1.0.0-blue)

Кастомная нода для n8n, которая позволяет работать с платежами Telegram Stars через Telegram Bot API.

## 🌟 Поддерживаемые возможности

- **Send Invoice** - Отправка счета для оплаты в Telegram Stars
- **Answer Pre-Checkout Query** - Ответ на запросы pre-checkout
- **Refund Star Payment** - Возврат успешного платежа в Telegram Stars
- **Get Star Transactions** - Получение списка транзакций Telegram Stars
- **Get Bot Stars Balance** - Получение текущего баланса выбранного бота Telegram

## 📦 Быстрая установка

### Через Community Nodes (рекомендуется)

1. Откройте n8n
2. Перейдите в **Settings** > **Community Nodes**
3. Нажмите **Install**
4. Введите `n8n-nodes-telegram-stars`
5. Нажмите **Install**

### Локальная разработка

См. [local setup](./LOCAL_SETUP.md) для подробных инструкций по локальной настройке.

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

> [!warning] ВАЖНО
> Это хобби-проект, который не претендует на стабильность. Используйте на свой страх и риск. Автор не несет ответственности за любые финансовые потери или проблемы, связанные с использованием данного узла.

### Требования безопасности:
- Никогда не публикуйте Bot Token в открытом доступе
- Используйте HTTPS для всех webhook URL
- Регулярно проверяйте логи на предмет подозрительной активности
- Убедитесь, что ваша деятельность соответствует применимым законам

## 🤝 Вклад в проект

Вклад приветствуется! См. [code of conduct](./CODE_OF_CONDUCT.md) для правил поведения.

1. Форкните репозиторий
2. Создайте ветку для ваших изменений
3. Внесите изменения и протестируйте их
4. Создайте Pull Request

## 💬 Поддержка и связь

- **Автор**: https://t.me/vlad_loop
- **Issues**: [GitHub Issues](https://github.com/Vlad-Loop/n8n-nodes-telegram-stars/issues)
- **Community Nodes**: [n8n Community](https://community.n8n.io/)

## 📄 Лицензия

MIT License - см. [LICENSE](./LICENSE) для подробностей.

