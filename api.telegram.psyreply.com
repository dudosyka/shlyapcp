upstream apitelegramupstream {
    server 0.0.0.0:8081;
    keepalive 64;
}

server {
    listen 80;

    server_name api.telegram.psyreply.com;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_pass http://apitelegramupstream;
        proxy_redirect off;
        proxy_read_timeout 240s;
    }
}
