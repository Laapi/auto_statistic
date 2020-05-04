import { Module } from '@nestjs/common';

import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { ApplicationController } from '@platform/auto/application.controller';
import { ApplicationService } from '@platform/auto/application.service';
import { CarParserProcessor } from '@platform/auto/application.consumer';

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
        BullModule.registerQueue({
            name: 'car_parser',
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
    ],
    controllers: [ApplicationController],
    providers: [ApplicationService, CarParserProcessor],
})
export class ApplicationModule {}
