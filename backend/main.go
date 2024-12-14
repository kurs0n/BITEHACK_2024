package main

import (
	"log"
	"net/http"

	"backend/handlers" // Update this import path to match your project structure

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
    r := chi.NewRouter()
    r.Use(middleware.Logger)
    handlers.RegisterStepsRoutes(r)

    port := ":3000"
    log.Printf("Server running on port %s", port)
    http.ListenAndServe(port, r)
}