import { Router } from 'express';
import * as search from './handlers/search';
import * as band from './handlers/band';

const router = Router();

router.get('/auto_suggest/:keyword', search.autoSuggest);
router.get('/search/:keyword', search.index);

router.get('/band/:id', band.index);

export default router;
