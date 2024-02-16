# Use an official Node.js runtime as a parent image
FROM node:21.5-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code to the container
COPY . .

# MUST USE npm start to get version
CMD ["npm", "start"]

# Expose port 3000
EXPOSE 3000