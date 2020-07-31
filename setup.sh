cp .env.example .env
docker-compose up -d 
echo '20 second dalay for up the mongodb server before runing the applicaton'
sleep 20s
docker-compose up -d 