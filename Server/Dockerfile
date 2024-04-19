FROM node:20.12-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build the app
EXPOSE 9000

# Run the app
CMD [ "npm", "run", "dev"]
