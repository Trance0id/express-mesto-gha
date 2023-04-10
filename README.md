[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект Mesto бэкенд

## Описание

Проект представляет собой бэкенд для созданного мной ранее одностраничного react-приложения Mesto, проект разработан мной в рамках выполнения практических работ 13, 14 на курсе Web-разработчик Яндекс.Практикума. Заданием на эти работы было написание бэкенда для приложения. Организация взаимодействия с БД MongoDB.

## Директории

 * `/routes` — папка с файлами роутера
 * `/middlewares` — папка с мидлварами
 * `/controllers` — папка с файлами контроллеров пользователя и карточки
 * `/models` — папка с файлами описания схем пользователя и карточки
 * `/utils` — папка с вспомогательными файлами: константами, собственными классами ошибок

## Функционал

### Приложение реализует функции бэкенда для проекта Mesto: ###

 * Хранение данных о пользователях и карточках в MongoDB
 * Валидация всех приходящих на сервер запросов при помощи Joi и Celebrate
 * Создание пользователей
 * Авторизация, создание jwt токена и передача его в httpOnly куках
 * Изменение информации о пользователе, аватара
 * Получение информации обо всех, или конкретных пользователях
 * Создание карточек
 * Удаление карточек, с проверкой прав на удаление
 * Постановка/снятие лайка карточек
 * Получение всех карточек
 * Обработка ошибок валидации при помощи Celebrate
 * Централизованная обработка ошибок

## Запуск проекта

 * `npm run start` — запускает сервер
 * `npm run dev` — запускает сервер с hot-reload

## Ссылка на проект (для тестов)

https://github.com/Trance0id/express-mesto-gha
