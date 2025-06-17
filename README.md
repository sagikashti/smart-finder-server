# SmartFinderServer

A production-ready Node.js backend API built with TypeScript that serves as a smart search engine. The initial implementation focuses on text-based shirt search using AI to extract colors and prices from user queries.

## Features

- Express-based API server with TypeScript
- AI integration using Claude 3 Haiku via OpenRouter
- Modular and scalable architecture
- Production-grade security and performance features
- Comprehensive error handling and logging
- Future support for voice and image search

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenRouter API key

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Add your OpenRouter API key to the `.env` file

## Development

Start the development server:
```bash
npm run dev
```

## Production

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

### POST /api/ask

Process a search query to extract shirt information.

Request body:
```json
{
  "prompt": "string",
  "type": "text" // optional, defaults to "text"
}
```

Response:
```json
{
  "shirtsArr": [
    {
      "colorsShirt": ["color1", "color2"],
      "PriceShirt": 25.00
    }
  ]
}
```

## Project Structure

```
src/
  ├── app.ts              # Main application file
  ├── config/            # Configuration files
  ├── routes/            # API routes
  ├── controllers/       # Request handlers
  ├── services/         # Business logic
  ├── middlewares/      # Express middlewares
  ├── models/           # Data models
  ├── utils/            # Utility functions
  ├── ai/               # AI integration
  └── types/            # TypeScript types
```

## Error Handling

The API uses a centralized error handling system with custom `ApiError` class. All errors are logged and returned in a consistent format:

```json
{
  "status": "error",
  "message": "Error message",
  "stack": "Error stack trace (development only)"
}
```

## Logging

The application uses Pino for logging with the following levels:
- error: For error conditions
- warn: For warning conditions
- info: For informational messages
- debug: For debug messages

## Future Enhancements

- Voice search integration
- Image search integration
- Caching layer
- Rate limiting
- API documentation with Swagger
- Unit and integration tests 