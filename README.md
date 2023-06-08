# museum4punkt0 // Materialisierung des Immateriellen im Museum Setup


based on [official strapi-next template](https://github.com/strapi/starters-and-templates/tree/main/packages/starters/next-blog), but nuxt3 instead of next.

Frontend:
- Vite
- Nuxt
- storybook
- ESLint + typescript

Backend:
- strapi (with mysql)


## please use taskfile.dev
then run
```
task -l
```
you can get info more with this help tool


## hints for hosting

This project is developed with devops cycling by henkelhiedl.
Source code repository and CI/CD Settings is hosted on a private gitlab instance, and designed for deploying to a docker swarm service (at this moment planetary quantum [https://www.planetary-quantum.com]).

TBD: and the aspect from security and removing settings files (.gitlab-ci.yml and .quantum).


## how to run the setup on your localhost
1. fill .env file settings
```
### strapi related values ###
ADMIN_JWT_SECRET=(Token String: ca. 25 random characters)
API_TOKEN_SALT=(Token String: ca. 25 random characters)
JWT_SECRET=(Token String: ca. 25 random characters)
APP_KEYS=(more than 3 Token with comma separated)
HOST=0.0.0.0 (localhost for strapi docker container address)
PORT=1337 (port for docker container port)

### nuxt related values ###
SECRET=(Token String: ca. 25 random characters)
TEXT_CONTENT_API=http://localhost:1337
MAIL_TRANSPORT_HOST=(hostname or ip address of your smtp server)
MAIL_TRANSPORT_PORT=(port number of your smtp server)
MAIL_TRANSPORT_USER=(authentication user of your smtp server)
MAIL_TRANSPORT_PASSWORD=(authentication password of your smtp server)
MAIL_TRANSPORT_TO_ADDRESS=(your email address sending from the contact form)

### for frontend gateway
NUXT_SERVER_URL=http://frontend:3000
STRAPI_SERVER_URL=http://backend:1337
```

2. call ```docker-compose up --build``` it could be failed. please call ``` docker-compose up ``` until it works. if not please contact us.


3. the contents based on upload tar ball and sql dump should be placed. please contact us. we can provide them.


4. open browser with following address ```http://localhost:2020```


## for deployment with docker-compose.(staging|production).yml

fill .env file following values

DOCKER_REGISTRY_HOST: where you docker registry hosted

TOP_DOMAIN: your top domain
or your domain assets
  BACKEND_DOMAIN:
  FRONTEND_DOMAIN:
  FRONTEND_GATEWAY_DOMAIN:

and AUTHORIZATION (format is user:token), if you need

