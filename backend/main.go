package main

import (
	"log"
	"net/http"
	"os"

	"backend/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
)

func main() {
    // Load environment variables from .env file
    if err := godotenv.Load(); err != nil {
        log.Fatal("Error loading .env file")
    }

    r := chi.NewRouter()
    r.Use(middleware.Logger)
    handlers.RegisterStepsRoutes(r)

    port := os.Getenv("PORT")
    if port == "" {
        port = "3000"
    }
    log.Printf("Server running on port %s", port)
    http.ListenAndServe(":"+port, r)
}