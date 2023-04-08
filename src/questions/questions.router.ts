import { Router } from 'express';
import { questionController } from './questions.controller';
import { createValidator } from './questions.validator';
// Fire router func to create new router

export const questionsRouter: Router = Router();
// Do not need to invoke getAll function
//TODO
questionsRouter.get(
  '/questions',
  questionController.getAll,
);

questionsRouter.post(
  '/questions',
  createValidator,
  questionController.create,
);
