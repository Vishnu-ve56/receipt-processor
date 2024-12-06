# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your application
CMD ["node", "app.js"]