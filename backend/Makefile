generate: 
	protoc --go_out=./broker/gen --go-grpc_out=./broker/gen ./broker/proto/volunteer.proto
	protoc --go_out=./volunteer/gen --go-grpc_out=./volunteer/gen ./volunteer/proto/volunteer.proto