import { AppDataSource } from '../..';
import { Question } from './questions.entity';
import { instanceToPlain } from 'class-transformer';

export class QuestionsController {
  constructor(
    private questionRepository = AppDataSource.getRepository(
      Question,
    ),
  ) {}

  public async getAll(): Promise<Question[]> {
    //Declare variable to hold all questions
    let allQuestions: Question[];
    //Fetch all tasks using repo
    try {
      allQuestions = await this.questionRepository.find({
        order: {
          date: 'ASC',
        },
      });

      //Convert the questions instance to an array of objects
      allQuestions = instanceToPlain(
        allQuestions,
      ) as Question[];

      return allQuestions;
    } catch (error) {
      console.log(error);
    }
  }
}
