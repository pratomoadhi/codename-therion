# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port Nest.js runs on
EXPOSE 3001

# Start the Nest.js application
CMD ["npm", "run", "start"]
