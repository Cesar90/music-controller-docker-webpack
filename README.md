# Music Controller

Play and Stop Music

## Description

Project based on Djando Framework, for developement uses docker, webpack, react with typescript

## Getting Started
### Development

#### Build project with docker-compose

docker-compose build

#### Create django project

docker-compose run --rm app sh -c "django-admin startproject app ."

#### Run Linting

docker-compose run --rm app sh -c "flake8"

#### Run Testing

docker-compose run --rm app sh -c "python manage.py test"

#### Create api app

docker-compose run --rm app sh -c "python manage.py startapp api"

#### Create frontend app

docker-compose run --rm app sh -c "python manage.py startapp frontend"


#### Test if database is ready

docker-compose run --rm app sh -c "python manage.py wait_for_db"

#### Fix flake8 erros

docker-compose run --rm app sh -c "python /app/flake8_autofix.py"

#### Test if database is ready and run flake8

docker-compose run --rm app sh -c "python manage.py wait_for_db && flake8"

# Create migrations

docker-compose run --rm app sh -c "python manage.py makemigrations"

# Run migrations

docker-compose run --rm app sh -c "python manage.py wait_for_db && python manage.py migrate"

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

First Tab:

```sh
node app
```

Second Tab:

```sh
gulp watch
```

(optional) Third:

```sh
karma test
```
