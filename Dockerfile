# Use Node.js 18 official image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Create uploads folder (for multer)
RUN mkdir -p public/uploads

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]