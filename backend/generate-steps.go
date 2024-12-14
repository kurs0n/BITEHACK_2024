package main

import (
	"context"
	"fmt"
	"github.com/google/generative-ai-go/genai"
	"log"
)

var client *genai.Client
var ctx = context.Background()

func generateSteps(recievedTask string) {
	model := client.GenerativeModel("gemini-1.5-flash")
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
	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		log.Fatal(err)
	}

	printResponse(resp)
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
