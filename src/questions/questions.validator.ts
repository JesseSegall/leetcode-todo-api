import { Status } from './../enums/status';
import { body, ValidationChain } from 'express-validator';
import { Difficulty } from '../enums/difficulty';

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
    .isIn([
      Status.completed,
      Status.needsReview,
      Status.todo,
    ])
    .withMessage(
      'Status can only be completed, Needs Review, or ToDo,',
    ),
];
