package main

import (
	"context"
	"log"
	"net"

	"volunteer/db"
	volunteer "volunteer/gen/volunteer"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type server struct {
    volunteer.UnimplementedVolunteerServiceServer
}

func (s *server) GetVolunteer(ctx context.Context, req *volunteer.GetVolunteerRequest) (*volunteer.GetVolunteerResponse, error) {
    vol, err := db.GetVolunteerById(ctx, int(req.GetId()))
    if err != nil {
        return nil, err
    }

    return &volunteer.GetVolunteerResponse{
        Volunteer: &volunteer.Volunteer{
            Id:              int32(vol.ID),
            Name:            vol.Name,
            Surname:         vol.Surname,
            Email:           vol.Email,
            TelephoneNumber: vol.TelephoneNumber,
            Photo:           &vol.Photo,
            Tags:            vol.Tags,
            Voivodeship:     vol.Voivodeship,
        },
    }, nil
}

func (s *server) ListVolunteers(ctx context.Context, req *volunteer.ListVolunteersRequest) (*volunteer.ListVolunteersResponse, error) {
    volunteers, err := db.ListVolunteers(ctx)
    if err != nil {
        return nil, err
    }

    var volunteerList []*volunteer.Volunteer
    for _, vol := range volunteers {
        volunteerList = append(volunteerList, &volunteer.Volunteer{
            Id:              int32(vol.ID),
            Name:            vol.Name,
            Surname:         vol.Surname,
            Email:           vol.Email,
            TelephoneNumber: vol.TelephoneNumber,
            Photo:           &vol.Photo,
            Tags:            vol.Tags,
            Voivodeship:     vol.Voivodeship,
        })
    }

    return &volunteer.ListVolunteersResponse{
        Volunteers: volunteerList,
    }, nil
}

func (s *server) CreateVolunteer(ctx context.Context, req *volunteer.CreateVolunteerRequest) (*volunteer.CreateVolunteerResponse, error) {
    vol := req.GetVolunteer()
    newVol, err := db.CreateVolunteer(ctx, &db.Volunteer{
        Name:            vol.GetName(),
        Surname:         vol.GetSurname(),
        Email:           vol.GetEmail(),
        TelephoneNumber: vol.GetTelephoneNumber(),
        Photo:           vol.GetPhoto(),
        Tags:            vol.GetTags(),
        Voivodeship:     vol.GetVoivodeship(),
    })
    if err != nil {
        return nil, err
    }

    return &volunteer.CreateVolunteerResponse{
        Volunteer: &volunteer.Volunteer{
            Id:              int32(newVol.ID),
            Name:            newVol.Name,
            Surname:         newVol.Surname,
            Email:           newVol.Email,
            TelephoneNumber: newVol.TelephoneNumber,
            Photo:           &newVol.Photo,
            Tags:            newVol.Tags,
            Voivodeship:     newVol.Voivodeship,
        },
    }, nil
}

func main() {
    // Initialize the database connection
    db.Init()

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