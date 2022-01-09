clear:
	@echo "Deleting existing containers"
	@docker container rm full-monty-website full-monty-api full-monty-mongo-express full-monty-mongo

dev:
	@echo "Starting full-monty dev mode"
	@npm --prefix website run dev&
	@npm --prefix api run dev&

start:
	@NODE_PORT=9090 NEXTJS_PORT=3000 docker compose -f .docker/docker-compose.yml up -d

stop:
	@docker stop full-monty-website full-monty-api full-monty-mongo-express full-monty-mongo