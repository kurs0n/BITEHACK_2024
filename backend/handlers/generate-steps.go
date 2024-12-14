package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
	"log"
	"os"
	"strings"
)

func generateSteps(recievedTask string) StepsResponse {
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
	prompt := fmt.Sprintf(`You are a helpful assistant for seniors. Provide a step-by-step guide in response to the following task: "%s". Each step must be in a numbered JSON format as shown below:
[
  {
    "index": 1,
    "description": "Step description here"
  },
  {
    "index": 2,
    "description": "Step description here"
  }
]
Respond with only the JSON output, nothing else.`, recievedTask)
	model := client.GenerativeModel("gemini-1.5-flash")
	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		log.Fatal(err)
	}

	return parseStepsResponse(resp)
}

func parseStepsResponse(resp *genai.GenerateContentResponse) StepsResponse {
	var stepsResponse StepsResponse

	for _, cand := range resp.Candidates {
		if cand.Content != nil {
			for _, part := range cand.Content.Parts {
				contentStr := fmt.Sprintf("%v", part)

				contentStr = strings.Trim(contentStr, " \n\r`")
				contentStr = strings.TrimSpace(contentStr)
				if strings.HasPrefix(contentStr, "json") {
					contentStr = strings.TrimPrefix(contentStr, "json")
				}
				contentStr = strings.TrimSpace(contentStr)

				err := json.Unmarshal([]byte(contentStr), &stepsResponse.Steps)
				if err != nil {
					log.Printf("Error parsing JSON: %v\nContent: %v", err, contentStr)
					continue
				} else {
					return stepsResponse
				}
			}
		}
	}

	return StepsResponse{
		Steps: []StepResponse{},
	}
}
