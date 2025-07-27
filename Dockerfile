# Base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project
COPY . .

# Expose React's default port
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
