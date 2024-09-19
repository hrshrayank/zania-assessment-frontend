# Use an official Node.js image as the base image
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the React app for production
RUN npm run build

# Serve the production build using an NGINX server
FROM nginx:alpine

# Copy the Vite build files from the previous stage to NGINX public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port NGINX will run on
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
