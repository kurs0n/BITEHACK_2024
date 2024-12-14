package main

import (
	"log"
	"net/http"
	"os"

	"backend/db"
	"backend/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
)

func main() {

    db.Init()
    log.Print(db.GetTags())
    // Load environment variables from .env file
    if err := godotenv.Load(); err != nil {
        log.Fatal("Error loading .env file")
    }

    r := chi.NewRouter()

    r.Use(cors.Handler(cors.Options{
        AllowedOrigins:   []string{"*"},
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
        ExposedHeaders:   []string{"Link"},
        AllowCredentials: true,
        MaxAge:           300,
    }))

    r.Use(middleware.Logger)
    handlers.RegisterStepsRoutes(r)

    port := os.Getenv("PORT")
    if port == "" {
        port = "3000"
    }
    log.Printf("Server running on port %s", port)
    http.ListenAndServe(":"+port, r)
}