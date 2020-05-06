import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { JOB_SERVICE } from '@platform/auto/data/ioc/constants';

import { JobService } from '@platform/auto/modules/job/job.service';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'job_queue',
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
    ],
    providers: [
        {
            provide: JOB_SERVICE,
            useClass: JobService,
        },
    ],
})
export class JobModule {}
