import { LoggerService, Logger } from '@nestjs/common';

import {
    OnQueueCompleted,
    OnQueueActive,
    Processor,
    Process,
} from '@nestjs/bull';

import { Job } from 'bull';

@Processor('car_parser')
export class CarParserProcessor {
    private readonly logger: LoggerService;

    public constructor() {
        this.logger = new Logger(CarParserProcessor.name);
    }

    @OnQueueActive()
    public onActive(job: Job): void {
        this.logger.debug(
            `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
        );
    }

    @OnQueueCompleted()
    public onCompleted(job: Job): void {
        this.logger.debug(
            `Completed job ${job.id} of type ${job.name} with result ${job.returnvalue}`,
        );
    }

    @Process('parse')
    public async parseCars(job: Job): Promise<void> {
        const platformPages: number = 200;

        const amountOfPages: IterableIterator<number> = Array.from(
            Array(platformPages),
        ).keys();

        for (const pageNumber of amountOfPages) {
            this.logger.debug(
                `Processing page iteration with page ${pageNumber}`,
            );

            /**
             * TODO: Replace for real action.
             */
            await new Promise((resolve) => setTimeout(resolve, 5000));

            const jobProgress: number = (pageNumber * 100) / platformPages;

            this.logger.debug(`Current job progress ${jobProgress}`);

            await job.progress(jobProgress);
        }
    }
}
