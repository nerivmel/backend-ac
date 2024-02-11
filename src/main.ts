import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configura las opciones de CORS
  app.enableCors({
    origin: 'https://residuosyempaques.netlify.app', // Reemplaza con el origen de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Habilita las cookies y encabezados de autorización
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
