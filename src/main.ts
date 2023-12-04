import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
// import session from 'express-session';

import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    cors: {
      credentials: true,
      origin: 'http://localhost:8080',
    },
  });

  app.use(
    session({
      secret: 'keyboard',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 600000,
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
