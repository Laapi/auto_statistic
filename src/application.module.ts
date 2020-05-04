import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ApplicationController } from '@platform/auto/application.controller';
import { ApplicationService } from '@platform/auto/application.service';

import { FetchModule } from '@platform/auto/modules/fetch/fetch.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'auto',
            entities: [],
            synchronize: true,
        }),
        FetchModule
    ],
    controllers: [ApplicationController],
    providers: [ApplicationService],
})
export class ApplicationModule {}
