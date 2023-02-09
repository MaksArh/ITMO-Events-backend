# ITMO EVENTS

_____
Для установки зависимостей и последующего локального тестирования (вне докера) необходимо выполнить:
```
poetry install
poetry shell
```
_____

### "Make" options
Для запуска docker-compose (создастся локальная бд):
```
make run
```
Для проверки подключения к базе данных (креды в .env):
```
make db
```
Выполни миграцию:
```
make migrate head
```

Теперь рекомендую проверить содержимое бд:
```
1) make db
2) \dt; #эта команда непосредственно после подключения в бд вводится
```
Должны быть выведены все таблицы. Если все так - супер.

**Проверь ручки: api/health/app и api/health/app**

---
### Запуск приложения локально (не в докере)
Для запуска бэка запусти файл: wsgi.py

