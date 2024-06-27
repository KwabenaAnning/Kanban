import express, { Request, Response, NextFunction } from "express";
import { appErrorHandler, genericErrorHandler, notFound } from "./middlewares/error.middleware";
// import { MongoClient } from 'mongodb';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDb from "./db";
import mongoose from "mongoose";
import apiVersion1 from "./config/versioning/v1";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const Env = process.env.NODE_ENV


app.use(express.json());
app.use(bodyParser.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use('/api/v1', apiVersion1)
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error?.code ?? 500).json(error);
});

export default app

async function run(){
    try{
         connectDb(process.env.MONGODB_URI).then(() => {
            console.log('Connected')
            console.log(mongoose.connection.db.databaseName)
        })

        app.listen(PORT, () => {
            console.log(`Application running on port ${PORT}`);
          });
    }catch(error){
        console.log(error)
    }
}

run()




