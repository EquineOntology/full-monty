SHELL=/bin/bash

include api/.env
include website/.env.local
export

START_SCRIPT ?= start

# "cache off" flag
ifeq ($(cache), false)
	args="--no-cache"
endif

.PHONY: help
## This help screen
help: 
	$(info Available targets)
	@awk '/^[a-zA-Z\-\_0-9]+:/ {                    \
		nb = sub( /^## /, "", helpMsg );            \
		if(nb == 0) {                               \
		helpMsg = $$0;                              \
		nb = sub( /^[^:]*:.* ## /, "", helpMsg );   \
		}                                           \
		if (nb)                                     \
		print  $$1 "\t" helpMsg;                    \
	}                                               \
	{ helpMsg = $$0 }'                              \
	$(MAKEFILE_LIST) | column -ts $$'\t' |          \
	grep --color '^[^ ]*'

.PHONY: build
## Build all full-monty containers. Add "cache=false" to build without cache.
build: 
	@echo "Building full-monty containers"
	@docker compose build $(args)

.PHONY: clear
## Delete all (stopped) full-monty containers
clear:
	@echo "Deleting full-monty containers"
	@docker container rm full-monty-website full-monty-api

.PHONY: dev
## Start all full-monty containers in dev mode (i.e. with file watchers)
dev: run_migrations
	@echo "Starting full-monty in dev mode"
	@START_SCRIPT=dev docker compose up -d --build

.PHONY: deploy
## Start all full-monty containers
deploy: run_migrations
	@echo "Starting full-monty"
	@docker compose up -d

.PHONY: logs
## Tail logs of all full-monty containers
logs:
	@docker compose logs --tail=100 -f

.PHONY: start-attached
## Start all full-monty containers in dev mode, but attached to the shell
start-attached: run_migrations
	@echo "Starting full-monty in dev mode, attached"
	@START_SCRIPT=dev  docker compose up

.PHONY: stop
## Stop all full-monty containers
stop:
	@echo "Stopping full-monty containers"
	@docker stop full-monty-website full-monty-api


# Private
check_for_db:
ifeq (,$(wildcard api/database.sqlite))
	@echo "Creating database.sqlite for backend" && \
	touch api/database.sqlite
endif

run_migrations: check_for_db
	@echo "Running migrations" && \
	npm --prefix=api run migrate