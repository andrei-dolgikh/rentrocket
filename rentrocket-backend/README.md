## Rentrocket.
Работает на фреймворке NestJS и упакован в Docker-контейнеры вместе с Postgres и ORM Prisma.
В Docker используем два Volume - один для БД, второй для хранения загружаемых изображений.
Всего в приложении 4 docker-контейнеров:
database-container - Postgres база данных
nginx-container - пока не используется
nodejs-container - здесь расположено само приложение




## Установка и запуск
### Создай .env файл в корне проекта
```
DB_URL="postgresql://rentrocketadmin:xnr4nrjeez34nHSB2$32kdDk3ms@postgres:5432/rentrocket?schema=public"
JWT_SECRET="bhrc3c34njrc=dc34mrkc3*$#cr4vjnXC&c3kn32llce1n"
CAPTCHA_KEY="ES_5ea2c8b495c14adbb15abc5557dbe53a"
DOMAIN="localhost"
POSTGRES_USER=rentrocketadmin
POSTGRES_PASSWORD=xnr4nrjeez34nHSB2$32kdDk3ms
POSTGRES_DB=rentrocket


```


### Установи Docker и docker-compose, затем:
```
docker-compose up --build
```

Зайди в командную оболочку контейнера castle-backend-nodejs (docker exec -it 8f003d9798c8 sh) и экспортируй схему БД из prisma в postgres.
Должен быть запущен контейнер с postgres
```
npx prisma db push
```

После изменений в структуре БД сначала делаем локально ```npx prisma generate```, потом по схеме выше пушим изменения в докер контейнер.


### Запуск в фоновом режиме 
docker-compose up -d


### Как зайти в базу данных и повысить юзера до админа (применяется при первом запуске проекта)
```
psql -U rentrocketadmin -d rentrocket
```

```
UPDATE "users" SET "roles" = ARRAY['user'::"Roles"] WHERE "login" = 'perdus_merdus';
```

## Настройка

В rentrocket-backend/src/main.ts нужно указать домен фронта в app.enableCors.

В rentrocket-backend/src/auth/auth.service.ts нужно настроить работу куки в addRefreshTokenToResponse и removeRefreshTokenFromResponse.

Меняй domain на домен бэкенда, а sameSite выставь в lax


