#!/bin/bash

JMETER_PATH="./apache-jmeter-5.4.3/apache-jmeter-5.4.3/bin"

echo "Installing required dependencies..."
npm i -g pm2

echo "Starting script: kill-ports and delete log file..."
pm2 stop all
rm ./jmeter.log
pm2 --name Node start ./NodeJs/index.js -- start &
pm2 --name Express start ./Express -- start &
pm2 --name Fastify start ./Fastify -- start &
pm2 --name Golang start ./Golang/main.exe &
pm2 list
echo "Generate report, once server has started..."
cd .. & $JMETER_PATH/jmeter -n -t $JMETER_PATH/ThreadGroup.jmx ;
echo "End of script: kill-port"
pm2 stop all
