#Execute this script with npm run deploy

cat << EOF

###########################################################
# Auto deploy for web app to cloud server
###########################################################

EOF

scp -r -i ~/Documents/KeyPairs/AWSconcilia.pem dist/* ubuntu@ec2-54-161-163-125.compute-1.amazonaws.com:/var/www/conciliaciones.future.com.mx/public_html

#scp [other options] [source username@IP]:/[directory and file name] [destination username@IP]:/[destination directory]