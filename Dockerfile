# Used this version.
FROM node:4.4.5

# Highest package for Python here is 3.4, so... we must build one for 3.5.1.
RUN apt-get update && \
    apt-get install -y \
                    wget \
                    xz-utils \
                    build-essential \
                    libsqlite3-dev \
                    libreadline-dev \
                    libssl-dev \
                    openssl

WORKDIR /tmp
RUN wget https://www.python.org/ftp/python/3.5.1/Python-3.5.1.tar.xz
RUN tar -xf Python-3.5.1.tar.xz
WORKDIR /tmp/Python-3.5.1
RUN ./configure
RUN make
RUN make install

WORKDIR /
RUN rm -rf /tmp/Python-3.5.1.tar.xz /tmp/Python-3.5.1

RUN pip3 install ipython


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

#Duh! On Windows 7, you NEED to connect to what the command
# docker-machine ip default will display, plus the exposed port, not localhost!!!
# Now it works.
RUN pip3 install -r requirements.txt

EXPOSE 8765
EXPOSE 3000

#/usr/local/bin/python3 server.py
CMD npm start