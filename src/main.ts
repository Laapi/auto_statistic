import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ApplicationModule } from '@platform/auto/application.module';

async function bootstrap(): Promise<void> {

    const application: INestApplication =
        await NestFactory.create<INestApplication>(ApplicationModule);

    await application.listen(3000);
}

bootstrap();
