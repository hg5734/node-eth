
## this repo is following MVC pattern
1. Controllers (Req/Res logic)
2. Services (Business logic)
3. database/models (DB schema)
4. database/services (DAO layer)
5. config (application messages and constants)
6. middleware (Authorization/Global Error handling)
7. routes (Application routes)
8. utils (Logging/applicaton utils)
9. Request validaitons
10. logs(application error and success logs)
11. Docker file 
12. Docker compose file for developent of application with mongodb
13. Halmet for security
14. postman (Created API postman collection for testing)

## To build docker image and run

1. Update .env.example file before the setup 

2. Used docker compose with monogdb for testing the API
./setup.sh

3. To clean the setup 
./cleanup.sh


## Blockchain Logic 
1. Add Asset API sync the Approve/Transfer logs in db till the latest block

2. EthService have logic of syncing the past logs from the last sync block to latest block

3. It decode the event logs using ERC 20 token ABI and prepare the db data

4. Logs listing api also sync the new blocks for logs.

## Note
For production level we can use various efficent techinque according to requirement

We can follow the Microservice architecture with for sync the logs async way using message borker.








