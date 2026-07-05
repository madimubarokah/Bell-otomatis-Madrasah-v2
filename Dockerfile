# Use lightweight official Node.js image
FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install all dependencies (production & development for building)
RUN npm ci

# Copy all application source files
COPY . .

# Build the application (Compiles frontend to dist/ and backend to dist/server.cjs)
RUN npm run build

# Set environment variables
ENV NODE_ENV=production

# Expose the configured Madrasah Automatic Bell port
EXPOSE 2008

# Start the compiled production-ready server
CMD ["node", "dist/server.cjs"]
