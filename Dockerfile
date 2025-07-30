# # Base image
# FROM node:18

# # Set working directory inside the container
# WORKDIR /app

# # Copy dependency files
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of your project
# COPY . .

# # Expose React's default port
# EXPOSE 3000

# # Start the development server
# CMD ["npm", "start"]
# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install serve
COPY package*.json ./
RUN npm install --production && npm install -g serve

# Copy the rest of the files
COPY . .

# Build the React app
RUN npm run build

# Expose port where serve will run
EXPOSE 3000

# Serve the build folder
CMD ["serve", "-s", "build", "-l", "3000","bala"]
