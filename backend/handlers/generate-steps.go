package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
	"log"
	"os"
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

	printResponse(resp)

	return parseResponse(resp)
}

func printResponse(resp *genai.GenerateContentResponse) {
	for _, cand := range resp.Candidates {
		if cand.Content != nil {
			for _, part := range cand.Content.Parts {
				fmt.Println(part)
			}
		}
	}
	fmt.Println("---")
}

func parseResponse(resp *genai.GenerateContentResponse) StepsResponse {
	var stepsResponse StepsResponse

	generatedContent := extractGeneratedContent(resp)

	err := json.Unmarshal([]byte(generatedContent), &stepsResponse.Steps)
	if err != nil {
		log.Fatalf("Error parsing Gemini response: %v", err)
	}

	return stepsResponse
}

func extractGeneratedContent(resp *genai.GenerateContentResponse) string {
	var result string
	for _, cand := range resp.Candidates {
		if cand.Content != nil {
			partsBytes, err := json.Marshal(cand.Content.Parts)
			if err != nil {
				log.Fatalf("Error marshalling content parts: %v", err)
			}
			result += string(partsBytes)
		}
	}
	return result
}
