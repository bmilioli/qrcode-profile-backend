# Imagem base
FROM node:latest

# Workdir
WORKDIR /app

# Coping package.json and package-lock.json
COPY package*.json ./
COPY .env ./
ENV $(cat /.env | xargs)


# instaling dependencies
RUN npm install

# Coping source code
COPY . .

# exposing port
EXPOSE 5000

# starting app
CMD [ "npm", "start" ]