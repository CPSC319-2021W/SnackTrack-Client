FROM node:latest

LABEL version="1.0"
LABEL description="This is Dockerfile for the frontend of SnackTrack app."

ENV APP_HOME /app
ENV PATH ${APP_HOME}/node_modules/.bin:$PATH
ENV PORT 3000

WORKDIR ${APP_HOME}

COPY package.json .
COPY . ${APP_HOME}

RUN yarn install && yarn run build

EXPOSE ${PORT}

CMD ["yarn", "start"]
