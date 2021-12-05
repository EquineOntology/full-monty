build:
	@echo "Building docker image"
	@docker build . -f .docker/webserver/Dockerfile -t full-monty-backend:dev

build-prod:
	@echo "Building production docker image"
	@docker build . -f .docker/webserver/Dockerfile -t full-monthy-backend:latest

clear:
	@echo "Deleting existing containers"
	@docker container rm webserver mongo-ui mongo

start:
	@docker compose -f .docker/docker-compose.yml up -d

start-attach:
	@docker compose -f .docker/docker-compose.yml up --build

stop:
	@docker stop mongo-ui mongo webserver