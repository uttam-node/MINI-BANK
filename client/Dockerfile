# client/Dockerfile

FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose React dev port
EXPOSE 3000

# Start the React dev server
CMD ["npm", "start"]
