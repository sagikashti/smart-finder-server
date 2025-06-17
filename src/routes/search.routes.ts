import { Router } from 'express';
import { SearchController } from '../controllers/search.controller';

const router = Router();
const searchController = new SearchController();

router.post('/ask', searchController.processSearch);

export const searchRouter = router; 