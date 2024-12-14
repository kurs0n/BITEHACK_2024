package main

import (
	"context"
	"log"
	"net"
	"volunteer/gen/volunteer"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type server struct {
	volunteer.UnimplementedVolunteerServiceServer
}

func (s *server) GetVolunteer(ctx context.Context, req *volunteer.GetVolunteerRequest) (*volunteer.GetVolunteerResponse, error) {
	return &volunteer.GetVolunteerResponse{
		Volunteer: &volunteer.Volunteer{
			Id:              req.GetId(),
			Name:            "John",
			Surname:         "Doe",
			Email:           "john.doe@example.com",
			TelephoneNumber: "123-456-7890",
			Tags:            []string{"tag1", "tag2"},
			Voivodeship:     "Somewhere",
		},
	}, nil
}

func main() {
	listener, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	volunteer.RegisterVolunteerServiceServer(grpcServer, &server{})
	reflection.Register(grpcServer)

	log.Printf("server listening at %v", listener.Addr())
	if err = grpcServer.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
