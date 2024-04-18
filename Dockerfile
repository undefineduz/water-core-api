# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /var/www

# Install Nest CLI globally
RUN npm install -g @nestjs/cli

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# RUN npm run build

# Specify the command to run the application
CMD ["npm", "run", "start:dev"]
