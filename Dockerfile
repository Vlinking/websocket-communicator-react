# Used this version.
FROM node:4.4.5

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Install all dependencies of the current project.
COPY package.json package.json
COPY npm-shrinkwrap.json npm-shrinkwrap.json
RUN npm install

# Copy all local files into the image.
COPY . .

# For some reason I can't connect to it, I'm using Docker for Windows 7.
# Maybe that's why... Virtual Machine Box or smth?
EXPOSE 3000
CMD ["npm", "start"]