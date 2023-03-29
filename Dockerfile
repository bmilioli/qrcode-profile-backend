# Imagem base
FROM node:latest

# Workdir
WORKDIR /app

# Coping package.json and package-lock.json
COPY package*.json ./

# Installing dependencies
RUN npm install 
# Copying source code
COPY . .

# Exposing port
EXPOSE 5000

# Starting app
CMD [ "npm", "start" ]
