import { Router } from 'express';
import { questionController } from './questions.controller';
import {
  createValidator,
  updateValidator,
} from './questions.validator';
// Fire router func to create new router

export const questionsRouter: Router = Router();
// Do not need to invoke getAll function as soon as router endpoint is accessed the .getAll function will fire
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

questionsRouter.put(
  '/questions',
  updateValidator,
  questionController.update,
);
