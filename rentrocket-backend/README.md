## Rentrocket.
Работает на фреймворке NestJS и упакован в Docker-контейнеры вместе с Postgres и ORM Prisma.
В Docker используем два Volume - один для БД, второй для хранения загружаемых изображений.
Всего в приложении 4 docker-контейнеров:
database-container - Postgres база данных
nginx-container - пока не используется
nodejs-container - здесь расположено само приложение




## Установка и запуск
### Создай .env файл в корне проекта (mode = dev \ prod)
```
DB_URL="postgresql://user:pass@postgres:5432/db?schema=public"
JWT_SECRET="secret"
CAPTCHA_KEY="key"
# DOMAIN="localhost"
TOKEN_DOMAIN="localhost"
# TOKEN_DOMAIN=".lockshield.online"
FRONTEND_URL="localhost"
# FRONTEND_URL="https://rentrocket.lockshield.online"
POSTGRES_USER=user
POSTGRES_PASSWORD=pass
POSTGRES_DB=db
MODE=dev



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

## Настройка (неактуально с переходом на env)

В rentrocket-backend/src/main.ts нужно указать домен фронта в app.enableCors.

В rentrocket-backend/src/auth/auth.service.ts нужно настроить работу куки в addRefreshTokenToResponse и removeRefreshTokenFromResponse.

    addRefreshTokenToResponse(res: Response, refreshToken: string) {
        const expiresIn = new Date()
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            domain: '.lockshield.online',
            expires: expiresIn,
            secure: true,
            // lax if production
            sameSite: 'none'
        })
    }

    removeRefreshTokenFromResponse(res: Response) {
        res.cookie(this.REFRESH_TOKEN_NAME, '', {
            httpOnly: true,
            domain: '.lockshield.online',
            expires: new Date(0),
            secure: true,
            // lax if production
            sameSite: 'none'
        })
    }




