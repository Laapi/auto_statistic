import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { JobService } from '@platform/auto/modules/job/job.service';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'fetch_queue',
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
    ],
    providers: [
        {
            provide: Symbol('IJobService'),
            useClass: JobService,
        },
    ],
})
export class JobModule {}
