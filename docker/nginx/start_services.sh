if [ ! -e /etc/letsencrypt/live/deltacs.sytes.net ]; then
    certbot --agree-tos -m deltacloudservices@protonmail.com -d deltacs.sytes.net --force-renewal --redirect
fi

nginx -t
service nginx start
echo "* * * * * /usr/bin/certbot renew && service nginx restart" >> certbot.renewal
crontab certbot.renewal
service cron start
tail -F /var/log/nginx/error.log > /dev/null