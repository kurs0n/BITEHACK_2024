package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
)

type StepsRequest struct {
	Prompt string `json:"prompt"`
}

type StepResponse struct {
	Index       int32  `json:"index"`
	Description string `json:"description"`
	Icon        string `json:"icon,omitempty"`
}

type StepsResponse struct {
	Steps []StepResponse `json:"steps"`
}

type Instruction struct {
    Index       int32  `json:"index"`
    Description string `json:"description"`
}

type DetailedStepRequest struct {
	Instructions []Instruction `json:"instruction-list"`
    Prompt       string        `json:"prompt"`
}

func StepsHandler(w http.ResponseWriter, r *http.Request) {
	var req StepsRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	tag := matchTag(req.Prompt)

	generatedResp := generateSteps(req.Prompt, tag)

	respondWithJSON(w, http.StatusOK, generatedResp)

}

func detailedStepHandler(w http.ResponseWriter, r *http.Request) {
	var req DetailedStepRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

	generatedResp := detailedStepGenerator(req.Prompt, req.Instructions)

	respondWithJSON(w, http.StatusOK, generatedResp)
}

func respondWithJSON(w http.ResponseWriter, status int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(payload)
}

func RegisterStepsRoutes(r chi.Router) {
	r.Post("/steps", StepsHandler)
	r.Post("/detailed-step", detailedStepHandler)
}
