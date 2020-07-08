FROM golang:1.14.3-alpine AS builder

WORKDIR /go/src/app
COPY main.go .

COPY go.mod go.sum ./
RUN go mod download
COPY .env .
# COPY . .

RUN go build -o webserver .

FROM alpine:3.12.0
WORKDIR /app
COPY --from=builder /go/src/app/webserver ./
COPY --from=builder /go/src/app/.env .       

COPY ./ui/build/ ./ui/build/

EXPOSE 8000

CMD ["./webserver"]