import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import routes from './routes';
// import rateLimit from './middlewares/rateLimit';

require('dotenv').config();

mongoose
  .connect(
    `mongodb+srv://${process.env.USER_PASS_MONGODB}@processoseletivo.0sbsh.mongodb.net/tractian?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  // .connect(`mongodb://localhost:27017/tractian`, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // })
  .then(() => {
    console.log(`MongoDB conectado com sucesso.`);
  });

class App {
  constructor() {
    this.server = express();
    this.middewares();
    this.use();
  }

  middewares() {
    this.server.use(helmet());
    // this.server.use(...rateLimit);
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));

    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp'), {
        etag: true,
        maxAge: '30d',
        immutable: true,
      })
    );

    this.server.use((_, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Credentials', true);
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Options,Authorization'
      );
      res.header('Access-Control-Allow-Methods', [
        'POST',
        'GET',
        'PUT',
        'DELETE',
        'OPTIONS',
      ]);

      this.server.use(cors());

      next();
    });
  }

  use() {
    this.server.use(routes);
  }
}

export default new App().server;
