package handlers

import (
	"backend/db"
	"backend/gen/volunteer"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
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

var clientGRPC volunteer.VolunteerServiceClient

func RegisterVolunteerRoutes(r chi.Router, client1 volunteer.VolunteerServiceClient) {
	r.Post("/create-volunteer", createVolunteer)
	r.Post("/list-volunteers", listVolunteers)

	clientGRPC = client1
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

	_, err := clientGRPC.CreateVolunteer(ctx, grpcReq)
	if err != nil {
		log.Fatalf("could not create volunteer: %v", err)
	}

	respondWithJSON(w, http.StatusOK, "Volunteer created successfully")
}

func parseVolunteerTagsToText(volunteerTags []db.VolunteerTag) string {
	var text string
	text += "["
	for i, volunteerTag := range volunteerTags {
		text += fmt.Sprintf(`{ID: %d, Tag: "%s"}`, volunteerTag.ID, volunteerTag.Tag)
		if i < len(volunteerTags)-1 {
			text += ", "
		}
	}
	text += "]"
	return text
}

func listVolunteers(w http.ResponseWriter, r *http.Request) {
	var request struct {
		Prompt      string `json:"prompt"`
		Voivodeship string `json:"voivodeship"`
	}

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	tags := getTagsFromPrompt(request.Prompt)

	grpcReq := &volunteer.ListVolunteersRequest{
		Tags:        tags,
		Voivodeship: request.Voivodeship,
	}

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	grpcResp, err := clientGRPC.ListVolunteers(ctx, grpcReq)
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

func getTagsFromPrompt(recievedPrompt string) []string {
	ctx := context.Background()

	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		log.Fatal("API key not set. Please set the GEMINI_API_KEY environment variable.")
	}

	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		log.Fatalf("Error creating Generative AI client: %v", err)
	}
	defer func(client *genai.Client) {
		err = client.Close()
		if err != nil {
			log.Fatalf("Error closing Generative AI client: %v", err)
		}
	}(client)

	tagsList, err := db.GetVolunteerTags()
	if err != nil {
		log.Fatalf("Error getting volunteer tags: %v", err)
	}
	tagsListText := parseVolunteerTagsToText(tagsList)

	prompt := fmt.Sprintf(`You are a helpful assistant. Match the most relevant tags from the following list to the given task. 

Task: "%s"

Tags: %s

Associate tag "TECHNOLOGIA" as anything related to electronics, computers, internet, etc.
Return only the tags that are relevant to the task, separated by commas. If no tags are relevant, return an empty string.`, recievedPrompt, tagsListText)

	model := client.GenerativeModel("gemini-1.5-flash")
	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		log.Fatalf("Error generating content: %v", err)
	}

	var tags []string
	for _, candidate := range resp.Candidates {
		if candidate.Content != nil {
			log.Printf("Candidate Content: %+v", candidate.Content.Parts)
			for _, part := range candidate.Content.Parts {
				response := fmt.Sprintf("%v", part)
				response = strings.TrimSpace(response)
				if response != "" {
					tags = strings.Split(response, ",")
					for i := range tags {
						tags[i] = strings.TrimSpace(tags[i])
					}
				}
			}
			break
		}
	}

	return tags

}
