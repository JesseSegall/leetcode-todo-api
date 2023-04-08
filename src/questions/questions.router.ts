import { Router, Request, Response } from 'express';
import { QuestionsController } from './questions.controller';
// Fire router func to create new router

export const tasksRouter: Router = Router();

tasksRouter.get(
  '/questions',
  async (req: Request, res: Response) => {
    const questionController = new QuestionsController();
    const allQuestions = await questionController.getAll();
    res.json(allQuestions).status(200);
  },
);
