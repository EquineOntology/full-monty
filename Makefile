build:
	@echo "Building full-monty containers"
	@NODE_PORT=9090 NEXTJS_PORT=3000 docker compose build

clear:
	@echo "Deleting full-monty containers"
	@docker container rm full-monty-website full-monty-api full-monty-mongo-express full-monty-mongo

dev_api:
	@echo "Starting Node API server"
	@npm --prefix api run dev

dev_website:
	@echo "Starting NextJS"
	@npm --prefix website run dev

start:
	@echo "Starting full-monty containers"
	@NODE_PORT=9090 NEXTJS_PORT=3000 docker compose up -d

stop:
	@echo "Stopping full-monty containers"
	@docker stop full-monty-website full-monty-api full-monty-mongo-express full-monty-mongo