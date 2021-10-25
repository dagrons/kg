FROM alpine

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
    apk add --no-cache nodejs npm     

COPY . /app

WORKDIR /app

RUN npm install

ENTRYPOINT [ "/bin/sh", "entrypoint.sh" ]