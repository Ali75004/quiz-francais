FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files and scripts needed for postinstall
COPY package*.json ./
COPY scripts/ ./scripts/

# Install dependencies (postinstall will generate icons)
RUN npm ci --omit=dev

# Copy the rest of the source
COPY . .

# Expose Railway's dynamic port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
