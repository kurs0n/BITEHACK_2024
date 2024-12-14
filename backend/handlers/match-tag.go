package handlers

import (
	"backend/db"
	"context"
	"fmt"
	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
	"log"
	"os"
	"strings"
)

func matchTag(recievedTask string) string {
	ctx := context.Background()

	tags, err := db.GetTags()
	if err != nil {
		log.Fatal(err)
	}

	tagNames := make([]string, len(tags))
	for i, tag := range tags {
		tagNames[i] = tag.Name
	}
	tagList := strings.Join(tagNames, ", ")

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
	prompt := fmt.Sprintf(`Based on the following task: "%s" and the provided list of tags: [%s], 
return the single most relevant tag for the task. Respond with only the selected tag and nothing else.
`, recievedTask, tagList)
	model := client.GenerativeModel("gemini-1.5-flash")
	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		log.Fatal(err)
	}

	var tag string

	for _, cand := range resp.Candidates {
		if cand.Content != nil {
			log.Printf("Response Candidate Parts: %+v", cand.Content.Parts)

			for _, part := range cand.Content.Parts {
				tag = fmt.Sprintf("%v", part)
				break
			}
		}
	}

	return strings.TrimSpace(tag)
}
