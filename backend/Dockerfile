# Use an official Node runtime as a parent image
FROM node:10.11.0-alpine

# Set the working directory to /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .

# Install any needed packages specified
RUN yarn install

# Copy the current directory contents into the container at /app
COPY . .

# Run app.py when the container launches
CMD ["yarn", "start"]
