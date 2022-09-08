#Execute this script with npm run dev-deploy

cat << EOF

###########################################################
# Auto deploy for DEV web app to cloud server
###########################################################

EOF

scp -r -i ~/Documents/KeyPairs/ec2global.pem dist/* ubuntu@ec2-35-163-206-224.us-west-2.compute.amazonaws.com:/var/www/creatsol.future.com.mx/public_html

#scp [other options] [source username@IP]:/[directory and file name] [destination username@IP]:/[destination directory]