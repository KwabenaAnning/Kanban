import { Db } from 'mongodb';

declare module 'express-serve-static-core' {
  interface Application {
    db?: Db;
  }
}
