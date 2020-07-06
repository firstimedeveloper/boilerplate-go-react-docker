all: ui build run

.PHONY: ui
ui:
	@cd ui && npm run build && cd ..

build:
	@docker build -t webserver .
run:
	@docker run --name webapp -d -p 8000:8000 webserver

clean:
	@docker stop webapp
	docker rm webapp