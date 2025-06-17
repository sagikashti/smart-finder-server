import { Request, Response, NextFunction } from 'express';
import { ClaudeService } from '../ai/claude.service';
import { SearchRequest } from '../types/search.types';
import { ApiError } from '../middlewares/error.middleware';
import { logger } from '../utils/logger';

export class SearchController {
  private claudeService: ClaudeService;

  constructor() {
    this.claudeService = new ClaudeService();
  }

  processSearch = async (
    req: Request<{}, {}, SearchRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { prompt, type = 'text' } = req.body;

      if (!prompt) {
        throw new ApiError(400, 'Prompt is required');
      }

      logger.info(`Processing ${type} search request: ${prompt}`);

      let result;
      switch (type) {
        case 'text':
          result = await this.claudeService.processTextPrompt(prompt);
          break;
        case 'voice':
          throw new ApiError(501, 'Voice search not implemented yet');
        case 'image':
          throw new ApiError(501, 'Image search not implemented yet');
        default:
          throw new ApiError(400, 'Invalid search type');
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
