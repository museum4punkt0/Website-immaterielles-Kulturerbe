FROM node:lts as builder

WORKDIR /app

ARG TEXT_CONTENT_API
ARG MAIL_TRANSPORT_HOST
ARG MAIL_TRANSPORT_PORT
ARG MAIL_TRANSPORT_USER
ARG MAIL_TRANSPORT_PASSWORD
ARG MAIL_TRANSPORT_TO_ADDRESS
ARG GMAP_API_KEY

ENV TEXT_CONTENT_API ${TEXT_CONTENT_API}
ENV MAIL_TRANSPORT_HOST ${MAIL_TRANSPORT_HOST}
ENV MAIL_TRANSPORT_PORT ${MAIL_TRANSPORT_PORT}
ENV MAIL_TRANSPORT_USER ${MAIL_TRANSPORT_USER}
ENV MAIL_TRANSPORT_PASSWORD ${MAIL_TRANSPORT_PASSWORD}
ENV MAIL_TRANSPORT_TO_ADDRESS ${MAIL_TRANSPORT_TO_ADDRESS}
ENV GMAP_API_KEY ${GMAP_API_KEY}

ENV IN_DOCKER true

COPY . .

RUN yarn \
  --prefer-offline \
  --non-interactive \
  --production=false \
  --ignore-scripts

RUN yarn build

RUN rm -rf node_modules && \
  NODE_ENV=production yarn \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM node:lts

WORKDIR /app

COPY --from=builder /app  .

ENV HOST 0.0.0.0
EXPOSE 80

# CMD [ "yarn", "start" ]
CMD [ "node", "/app/.output/server/index.mjs" ]



