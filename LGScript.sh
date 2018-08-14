#!/bin/bash

while true
do

firebase database:get /BROADNAME/country > messages.txt
location=$(<messages.txt)
country=$(<save.txt)

if [ "$location" != "$country" ]
then
    echo $location > save.txt
    location=`echo $location | tr -d '"'`
    cd /tmp
    echo "search=$location">query.txt
    cd
fi
sleep 10
done


