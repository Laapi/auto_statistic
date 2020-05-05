import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

import { IJobScheduleService } from '@platform/auto/data/contracts/services/IJobScheduleService';

import { JobType } from '@platform/auto/data/enum/JobType';

import { Queue } from 'bull';

@Injectable()
export class JobScheduleService implements IJobScheduleService {

    public constructor(
        @InjectQueue('job_queue') private jobQueue: Queue,
    ) {}

    @Cron(CronExpression.EVERY_5_MINUTES)
    public fetchManufacturersAndModels(): void {

        this.jobQueue.add(
            'job_processor',
            {
                name: 'fetch_car_manufacturers_from_onliner',
                type: JobType.COLLECT_CAR_MANUFACTURERS_FROM_ONLINER,
            },
            {
                priority: 1,
            },
        );

    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    public fetchAdverts(): void {

        this.jobQueue.add(
            'job_processor',
            {
                name: 'fetch_car_adverts_from_onliner',
                type: JobType.COLLECT_CAR_ADVERTS_FROM_ONLINER,
            },
            {
                priority: 2,
            },
        );

    }
}
