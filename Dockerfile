FROM node:13-alpine

WORKDIR /app

COPY . .

RUN npm install

# Development
CMD ["npm", "run", "webpack"]
CMD ["npm", "run", "start"]
