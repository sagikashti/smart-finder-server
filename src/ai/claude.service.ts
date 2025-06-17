import dotenv from 'dotenv';
import path from 'path';

import axios from 'axios';
import { logger } from '../utils/logger';
import { SearchResponse } from '../types/search.types';
import { ApiError } from '../middlewares/error.middleware';

export class ClaudeService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor() {
    // Load environment variables from the project root .env file
    dotenv.config({ path: path.resolve(process.cwd(), '.env') });

    this.apiKey = process.env.OPENROUTER_API_KEY || '';
    this.apiUrl = process.env.OPENROUTER_API_URL || 'https://openrouter.ai/api/v1/chat/completions';

    if (!this.apiKey) {
      throw new Error('OPENROUTER_API_KEY is required');
    }
  }

  async processTextPrompt(prompt: string): Promise<SearchResponse> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'anthropic/claude-3-haiku',
          messages: [
            {
              role: 'system',
              content: `You are a helpful assistant that extracts shirt information from user queries.
              Return a JSON object with the following structure:
              {
                "shirtsArr": [
                  {
                    "colorsShirt": ["color1", "color2"],
                    "PriceShirt": 25.00
                  }
                ]
              }
              Extract colors and prices from the user's query. If no specific price is mentioned, use a reasonable default.
              Only return valid JSON, no other text.`,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const content = response.data.choices[0].message.content;
      const parsedResponse = JSON.parse(content) as SearchResponse;

      // Validate the response structure
      if (!this.isValidResponse(parsedResponse)) {
        throw new Error('Invalid response structure from AI');
      }

      return parsedResponse;
    } catch (error) {
      logger.error('Error processing text prompt:', error);
      throw new ApiError(500, 'Failed to process text prompt');
    }
  }

  private isValidResponse(response: any): response is SearchResponse {
    return (
      response &&
      Array.isArray(response.shirtsArr) &&
      response.shirtsArr.every(
        (shirt: any) => Array.isArray(shirt.colorsShirt) && typeof shirt.PriceShirt === 'number'
      )
    );
  }
}
