package handlers

import (
	"backend/gen/volunteer"
	"context"
	"encoding/json"
	"github.com/go-chi/chi/v5"
	"log"
	"net/http"
	"time"
)

type VolunteerRequest struct {
	Name            string   `json:"name"`
	Surname         string   `json:"surname"`
	Email           string   `json:"email"`
	TelephoneNumber string   `json:"telephone_number"`
	Tags            []string `json:"tags"`
	Voivodeship     string   `json:"voivodeship"`
	Photo           string   `json:"photo,omitempty"`
}

var client volunteer.VolunteerServiceClient

func RegisterVolunteerRoutes(r chi.Router, client1 volunteer.VolunteerServiceClient) {
	r.Post("/create-volunteer", createVolunteer)
	r.Post("/list-volunteers", listVolunteers)

	client = client1
}

func createVolunteer(w http.ResponseWriter, r *http.Request) {
	var req VolunteerRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	req.Photo = "https://bitehack.s3.eu-north-1.amazonaws.com/image.jpeg"

	grpcReq := &volunteer.CreateVolunteerRequest{
		Volunteer: &volunteer.Volunteer{
			Name:            req.Name,
			Surname:         req.Surname,
			Email:           req.Email,
			TelephoneNumber: req.TelephoneNumber,
			Tags:            req.Tags,
			Voivodeship:     req.Voivodeship,
			Photo:           &req.Photo,
		},
	}

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	_, err := client.CreateVolunteer(ctx, grpcReq)
	if err != nil {
		log.Fatalf("could not create volunteer: %v", err)
	}

	respondWithJSON(w, http.StatusOK, "Volunteer created successfully")
}

func listVolunteers(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Tags        []string `json:"tags"`
		Voivodeship string   `json:"voivodeship"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	grpcReq := &volunteer.ListVolunteersRequest{
		Tags:        req.Tags,
		Voivodeship: req.Voivodeship,
	}

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	grpcResp, err := client.ListVolunteers(ctx, grpcReq)
	if err != nil {
		http.Error(w, "Could not list volunteers: "+err.Error(), http.StatusInternalServerError)
		return
	}

	responseData := make([]VolunteerRequest, len(grpcResp.Volunteers))
	for i, v := range grpcResp.Volunteers {
		responseData[i] = VolunteerRequest{
			Name:            v.GetName(),
			Surname:         v.GetSurname(),
			Email:           v.GetEmail(),
			TelephoneNumber: v.GetTelephoneNumber(),
			Tags:            v.GetTags(),
			Voivodeship:     v.GetVoivodeship(),
			Photo:           getStringFromPointer(v.Photo),
		}
	}

	respondWithJSON(w, http.StatusOK, responseData)
}

func getStringFromPointer(value *string) string {
	if value != nil {
		return *value
	}
	return ""
}
