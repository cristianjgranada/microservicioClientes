FROM node:latest

WORKDIR /MICROSERVICIOCLIENTES

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm" , "start"]