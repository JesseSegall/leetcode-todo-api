import { AppDataSource } from '../..';
import { Question } from './questions.entity';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';

class QuestionsController {
  // Method for Get route
  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response> {
    //Declare variable to hold all questions
    let allQuestions: Question[];
    //Fetch all tasks using repo
    try {
      allQuestions = await AppDataSource.getRepository(
        Question,
      ).find({
        order: {
          date: 'ASC',
        },
      });

      //Convert the questions instance to an array of objects
      allQuestions = instanceToPlain(
        allQuestions,
      ) as Question[];

      return res.json(allQuestions).status(200);
    } catch (_error) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }
  //Method for POST route
  public async create(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    //Create new instance of question
    const newQuestion = new Question();

    //Add required properties to the Question Object
    newQuestion.title = req.body.title;
    newQuestion.date = req.body.date;
    newQuestion.description = req.body.description;
    newQuestion.difficulty = req.body.difficulty;
    newQuestion.status = req.body.status;

    //Add the new Question to the DB
    let createdQuestion: Question;

    try {
      createdQuestion = await AppDataSource.getRepository(
        Question,
      ).save(newQuestion);

      // Convert question instance to an object

      createdQuestion = instanceToPlain(
        createdQuestion,
      ) as Question;

      return res.json(createdQuestion).status(201);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }
  }
}

export const questionController = new QuestionsController();
