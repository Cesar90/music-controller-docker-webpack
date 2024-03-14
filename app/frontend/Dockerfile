# # Install dependencies only when needed
# FROM node:18-alpine3.15
# # Build step
# # 1. copy package.json and package-lock.json to /app dir
# RUN mkdir /app
# COPY package*.json /app
# # 2. Change working directory to newly created app dir
# WORKDIR /app
# # 3 . Install dependencies
# RUN npm ci
# # 4. Copy the source code to /app dir
# COPY . .
# # 5. Expose port 3000 on the container
# EXPOSE 3000
# # 6. Run the app
# CMD ["npm", "run", "start"]

# FROM node:18-alpine3.15
# FROM node:14.16.0-alpine3.13
FROM node:18-alpine3.15

# Build step
# 1. copy package.json and package-lock.json to /app dir
RUN mkdir /app
COPY app/frontend/package*.json /app
# 2. Change working directory to newly created app dir
WORKDIR /app
# 3 . Install dependencies
# RUN npm ci
RUN npm install
# 4. Copy the source code to /app dir
COPY . .
# 5. Expose port 3000 on the container
EXPOSE 3000
# 6. Run the app
CMD ["npm", "run", "dev"]