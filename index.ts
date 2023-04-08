import { Question } from './src/questions/questions.entity';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import { tasksRouter } from './src/questions/questions.router';

const app: Express = express();
dotenv.config();

// Parse Request Body converts json into JS object
app.use(bodyParser.json());

//use CORS install types
app.use(cors());

// Database Connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Question],
  synchronize: true,
});

const port = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    app.listen(port);
    console.log('Data source has been initialized.');
  })
  .catch((err) => {
    console.log(
      'Error during Data Source initialization',
      err,
    );
  });

app.use('/', tasksRouter);
