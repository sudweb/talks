FROM node:latest
RUN mkdir /app
RUN chown node:node -R /app
USER node
COPY . /app/
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
