# Stage 1: Build the application
FROM node:22.11.0-alpine3.20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the entire project to the working directory # (Excluded files will depend on your .dockerignore)
COPY . .

# Build the Nuxt.js project for production
RUN yarn run build

# Stage 2: Serve the application using a lightweight production image
FROM node:22.11.0-alpine3.20 AS runner

# Create and set the working directory inside the container
WORKDIR /app

# Copy only the output (build files) from the builder stage
COPY --from=builder /app/.output ./.output

# Expose the port Nuxt.js uses to serve the app
EXPOSE 3000

# Command to start the Nuxt.js server
CMD ["node", ".output/server/index.mjs"]
