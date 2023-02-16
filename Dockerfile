# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# install bash 
RUN apk add --no-cache bash


# Copy the rest of the application code to the working directory
COPY . .

# Expose the ports for the Nest.js app, MySQL and Redis
# EXPOSE 3000
EXPOSE 3200
EXPOSE 3307
EXPOSE 6380

# Start the Nest.js app
CMD [ "npm", "run", "start:dev" ]
