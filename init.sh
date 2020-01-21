#!/bin/bash

curr_dir=$PWD
server_dir=$PWD/server
client_dir=$PWD/client

docker stop dbepdia_server || true && docker rm dbepdia_server || true
docker stop dbpedia_client || true && docker rm dbpedia_client || true


# start backend server + db by pulling and running cayley image
echo "Initializing a new database and starting backend server"
docker run --name dbepdia_server -v $server_dir/data:/data -p 64210:64210 -d cayleygraph/cayley  -c /data/cayley.yml --init


# build frontend code
echo "Building frontend code"
docker build -t dbpedia_person_data_client:dev $client_dir
docker run --name dbpedia_client -v $client_dir:/app -v $client_dir/node_modules -p 3001:3000 --rm dbpedia_person_data_client:dev

# docker run -v $PWD/data:/data -p 64210:64210 -d cayleygraph/cayley  -c /data/cayley.yml --init