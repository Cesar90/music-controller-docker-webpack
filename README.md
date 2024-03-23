# Music Controller

Play and Stop Music

## Description

Project based on Djando Framework, for developement uses docker, webpack, react with typescript

## Getting Started

#### Build project with docker-compose
Build docker images of  ```django``` and  ```frontend(webpack)```, run this command in root of project
```bash
docker-compose build
```
#### Run project
After of build image, up project
```bash
docker-compose up
```
#### Create django project
```bash
docker-compose run --rm app sh -c "django-admin startproject app ."
```
#### Create api app
```bash
docker-compose run --rm app sh -c "python manage.py startapp api"
```
#### Create frontend app
```bash
docker-compose run --rm app sh -c "python manage.py startapp frontend"
```
#### Create frontend spotify
```bash
docker-compose run --rm app sh -c "python manage.py startapp spotify"
```
# Create migrations
```bash
docker-compose run --rm app sh -c "python manage.py makemigrations"
```
# Run migrations
```bash
docker-compose run --rm app sh -c "python manage.py migrate"
```

## Typescript
### Fixing issue of types in VS Code

First cd into the ```frontend``` folder.
```bash
cd frontend
```
Copy node_modules folder from container to host with docker command
```bash
docker cp music-controller-docker-webpack-frontend-1:/app/node_modules/ ./
```