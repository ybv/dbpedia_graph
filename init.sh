#!/bin/bash

curr_dir=$PWD
server_dir=$PWD/server
client_dir=$PWD/client

docker stop dbepdia_server &>/dev/null || true 
docker stop dbpedia_client &>/dev/null || true 

docker rm dbepdia_server &>/dev/null || true
docker rm dbpedia_client &>/dev/null || true

# start backend server + db by pulling and running cayley image
echo
echo "===Initializing a new database and starting backend server==="
echo
echo
docker run --name dbepdia_server -v $server_dir/data:/data -p 64210:64210 -d --rm cayleygraph/cayley  -c /data/cayley.yml --init

echo
echo "Backend server running at http://localhost:64210"
echo

# build frontend code
echo
echo "===Building frontend code==="
echo
echo

docker build -t dbpedia_person_data_client:dev $client_dir

docker run --name dbpedia_client -v $client_dir:/build -v $client_dir:/src -v $client_dir:/app -v $client_dir/node_modules -p 5000:5000 --rm dbpedia_person_data_client:dev

