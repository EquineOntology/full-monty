SHELL=/bin/bash

include api/.env
include website/.env.local
export

START_SCRIPT ?= "start"


ifeq ($(cache), false)
	args="--no-cache"
endif


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

## Build all full-monty containers. Add "cache=false" to build without cache.
build:
	@echo "Building full-monty containers"
	@docker compose build $(args)

## Delete all (stopped) full-monty containers 
clear:
	@echo "Deleting full-monty containers"
	@docker container rm full-monty-website full-monty-api full-monty-mongo-express full-monty-mongo

## Start all full-monty containers in dev mode (i.e. with file watchers)
dev:
	@echo "Starting full-monty in dev mode"
	@START_SCRIPT=dev docker compose up -d --build

## Start all full-monty containers
deploy:
	@echo "Starting full-monty"
	@docker compose up -d

## Tail logs of all full-monty containers
logs:
	@docker compose logs -f

## Start all full-monty containers in dev mode, but attached to the shell
start-attached:
	@echo "Starting full-monty in dev mode, attached"
	@START_SCRIPT=dev  docker compose up

## Stop all full-monty containers
stop:
	@echo "Stopping full-monty containers"
	@docker stop full-monty-website full-monty-api full-monty-mongo-express full-monty-mongo