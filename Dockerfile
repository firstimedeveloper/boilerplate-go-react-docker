FROM golang:1.14.3-alpine AS builder

WORKDIR /go/src/app
COPY main.go .

COPY go.mod go.sum ./
RUN go mod download
# COPY . .

RUN go build -o webserver .

FROM alpine:3.12.0
WORKDIR /app
COPY --from=builder /go/src/app/ /app/
COPY ./ui/build/ ./ui/build/

CMD ["./webserver"]