import { Router } from 'express';
import autoSuggest from './handlers/search';

const router = Router();

router.get('/', (req, res) => {
  res.sendStatus(200);
});

router.get('/auto_suggest/:keyword', autoSuggest);

export default router;
