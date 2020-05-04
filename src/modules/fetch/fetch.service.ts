import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

import { Queue } from 'bull';

@Injectable()
export class FetchService {

    public constructor(
        @InjectQueue('fetch_queue') private parserQueue: Queue,
    ) {}

    @Cron(CronExpression.EVERY_5_MINUTES)
    public fetchManufacturersFromOnliner(): void {
        this.parserQueue.add('fetch_manufacturers_from_onliner');
    }

    @Cron(CronExpression.EVERY_YEAR)
    public fetchCarsFromOnliner(): void {
        this.parserQueue.add('fetch_cars_from_onliner');
    }
}
