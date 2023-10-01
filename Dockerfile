# # https://stackoverflow.com/questions/69807663/how-to-build-docker-file-for-a-vuejs-application
# FROM node:lts-alpine

# RUN npm install -g http-server

# WORKDIR /app
# COPY package*.json ./ 
# RUN npm install
# COPY . .

# RUN npm run build
# EXPOSE 8080
# CMD [ "http-server", "dist" ]




# =======================================================================================
# BATAS
# diatas menggunakan npm. dibawah menggunakan yarn
# =======================================================================================




# Use node:lts-alpine as the base image
FROM node:lts-alpine

# Install yarn using apk (Alpine package manager)
RUN apk add --no-cache yarn

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json (if available) into the container
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies using yarn
RUN yarn install

# Copy the entire project content into the container
COPY . .

# Build the Vue.js application
# RUN yarn build

# Expose port 8080 (or the port your Vue.js application uses)
EXPOSE 8080

# Run the application with http-server
CMD ["yarn", "run", "serve"]
