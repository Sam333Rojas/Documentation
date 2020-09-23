# After stablishing the ec2 apache
```console
sudo yum install php55
sudo php -v
sudo httpd -v
sudo yum update -y
sudo php -v
sudo httpd -v
sudo service httpd start
sudo chkconfig httpd on
chkconfig --list httpd
```
## Install Nano and git
```bash
sudo yum install nano
sudo yum install git
```
## Copy the git in the ec2 
```bash
sudo git clone https://github.com/Sam333Rojas/PhoneBook.git
```
## Taking out the content of the git folder
```bash
sudo cp -a /var/www/html/PhoneBook/. /var/www/html/
sudo rm -rf  PhoneBook
sudo service httpd restart
```
## Configuration of composer
```bash
sudo php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
sudo php -r "if (hash_file('sha384', 'composer-setup.php') === '795f976fe0ebd8b75f26a6dd68f78fd3453ce79f32ecb33e7fd087d39bfeb978342fb73ac986cd4f54edd0dc902601dc') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
sudo php composer-setup.php
sudo php -r "unlink('composer-setup.php');"
sudo nano composer.json
sudo php composer.phar update
# path/to/composer require phpmailer/phpmailer
/var/www/sites/belanda_tech/html require phpmailer/phpmailer
/var/www/sites/belanda_tech/html7composer.phar require phpmailer/phpmailer
/var/www/html/composer.phar require phpmailer/phpmailer
sudo /var/www/html/composer.phar require phpmailer/phpmailer
sudo nano amazon-ses-smtp-sample.php

```
## composer.json:
```JSON
{
 "require":{
  "phpmailer/phpmailer": "^6.1"
 }
}
```
## Configuring FileZilla

```zsh
sudo chown -R ec2-user /var/www/html
 ```
