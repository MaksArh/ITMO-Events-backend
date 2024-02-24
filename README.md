# ITMO EVENTS 
## Nest.js+fastify backend

---

## Описание

(устарел, перешли на GoLang) Backend для организации всех внутренних и внешних мероприятий связанных с университетом ИТМО
Для полноценной работы необходимы внутренние ключи для подключения к OAuth ITMO.ID

Все `env` описываются в compose файле

Документация по api доступна через Swagger  `:5001/api/docs`

## Технологии

- Node.js
- NestJS
- Fastify
- PostgreSQL
- Docker
- Nginx
- OAuth2 через ITMO.ID

## Установка

```bash
$ npm i

$ docker compose -f ./docker-compose.dev.yaml up --build
```
