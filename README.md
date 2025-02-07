# Тестовое задание для MarketLab
Задание заключалось в создании генератора одноразовых ссылок. 
Я решил использовать Nest, с которым особо не работал, т.к. его использует MarketLab, в связи с чем пришлось решать некоторые ньюансы. Для хранения информации использовал Prisma с Postgres, а идентификатором ссылок выбрал CUID, т.к. он, в отличие от инкрементируемого числа, не говорит пользователю ничего о ссылке, а в сравнении с UUID занимает меньше места и не содержит дефисов, которые неудобно копировать. Также CUID упрощает потенциально необходимое для подобного сервиса горизонтальное масштабирование, ведь одна из его ключевых особенностей это зависимость от fingerprint'а клиента.
Это я тут описал всякие якобы рациональные причины, но по факту основное -- он приятнее UUID.
Определенно есть шанс коллизий, что можно было бы решить ретраями запроса на создание ссылок или усложнением идентификатора (например, добавляя хэш контента к CUID), а также подчищая неактивные ссылки, если нет необходимости не допускать перехода по старой ссылке, где могут быть уже новые данные. Но я не стал оптимизировать то, что в оптимизации на данный момент не нуждается.

Для удобства запуска я написал compose.yaml конфиг для docker compose. Для запуска просто выполните:
```sh
docker compose up
```
и сервер будет доступен по адресу `localhost:3000`.

### API
Я не стал добавлять swagger, так что вот кратко об апишке.

##### Создать ссылку `POST /link`

```json
{
    "content": "..."
}
```

##### Получить ссылку `GET /link/:id`

Выкинет HTTP ошибку 410 Gone, если ссылка уже была использована, и 404 Not Found, если такая не существует.
