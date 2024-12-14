package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
)

type StepsRequest struct {
    Prompt string `json:"prompt"`
}

type StepsResponse struct {
    Index int32 `json:"index"`
	Description string `json:"description"`
}

func StepsHandler(w http.ResponseWriter, r *http.Request) {
    var req StepsRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    response := StepsResponse{Index: 1, Description: req.Prompt}
    respondWithJSON(w, http.StatusOK, response)
}

func respondWithJSON(w http.ResponseWriter, status int, payload interface{}) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    json.NewEncoder(w).Encode(payload)
}

func RegisterStepsRoutes(r chi.Router) {
    r.Post("/steps", StepsHandler)
}