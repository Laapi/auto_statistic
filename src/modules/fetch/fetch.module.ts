import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { FetchProcessor } from '@platform/auto/modules/fetch/fetch.processor';
import { FetchService } from '@platform/auto/modules/fetch/fetch.service';
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
        FetchService,
        FetchProcessor,
        JobService
    ],
})
export class FetchModule {}
