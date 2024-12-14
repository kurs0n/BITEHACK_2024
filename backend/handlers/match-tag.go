package handlers

import (
	"context"
	"fmt"
	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
	"log"
	"os"
)

func matchTag(recievedTask string) string {
	ctx := context.Background()
	var tag string
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
	prompt := fmt.Sprintf(`Based on the following task: "%s" and the provided list of tags: %s, 
return the single most relevant tag for the task. Respond with only the selected tag and nothing else.
`, recievedTask)
	model := client.GenerativeModel("gemini-1.5-flash")
	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		log.Fatal(err)
	}

	return tag
}
