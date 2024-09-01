FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your React app
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port your React app will run on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]