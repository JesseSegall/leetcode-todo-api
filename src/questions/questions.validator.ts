import { Status } from './../enums/status';
import { body, ValidationChain } from 'express-validator';
import { Difficulty } from '../enums/difficulty';

// ValidationChain interface gives us type to use
export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The question needs a title.')
    .trim()
    .isString()
    .withMessage('Title needs to be in text format.'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('The questions needs to have a date.')
    .isString()
    .withMessage('Date needs to be a valid format.'),

  body('description')
    .trim()
    .isString()
    .withMessage('Description needs to be in text format.'),
  body('difficulty')
    .trim()
    .isIn([
      Difficulty.easy,
      Difficulty.medium,
      Difficulty.hard,
    ])
    .withMessage(
      'Difficulty can only be easy, medium, or hard.',
    ),

  body('status')
    .trim()
    .isIn([Status.completed, Status.review, Status.todo])
    .withMessage(
      'Status can only be completed, Needs Review, or ToDo,',
    ),
];

export const updateValidator = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('Task ID is needed.')
    .trim()
    .isString()
    .withMessage('ID needs to be in valid UUID format.'),

  body('status')
    .trim()
    .isIn([Status.completed, Status.review, Status.todo])
    .withMessage(
      'Status can only be completed, Needs Review, or ToDo,',
    ),
];
