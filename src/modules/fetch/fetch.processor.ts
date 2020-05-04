import {
    OnQueueCompleted,
    OnQueueActive,
    OnQueueFailed,
    Processor,
    Process,
} from '@nestjs/bull';
import { LoggerService, Logger } from '@nestjs/common';

import { JobService } from '@platform/auto/modules/job/job.service';
import { JobType } from '@platform/auto/data/enum/JobType';
import { Job } from '@platform/auto/data/entities/Job';

import { Job as QueueJob } from 'bull';

@Processor('fetch_queue')
export class FetchProcessor {

    private readonly logger: LoggerService;

    public constructor(
        private readonly jobService: JobService,
    ) {
        this.logger = new Logger(FetchProcessor.name);
    }

    @OnQueueActive()
    public async onActive(job: QueueJob<Job>): Promise<void> {

        /**
         * Create job in database.
         */
        const job_entity: Job = await this.jobService.createJob(
            job.id,
            JobType.FETCH_CARS_FROM_ONLINER,
        );

        /**
         * Link database job to Bull Queue Job.
         */
        await job.update(job_entity);

        this.logger.debug(
            `Start processing job: Internal ID - ${job.id}, External ID - ${job_entity.id}, of type ${job.name}.`,
        );
    }

    @OnQueueCompleted()
    public onCompleted(job: QueueJob<Job>, result: Array<number>): void {

        this.jobService.finishJob(
            job.data.id,
            result,
        );

        this.logger.debug(
            `Complete job: Internal ID - ${job.id}, External ID - ${job.data.id}, of type ${job.name}.`,
        );

        this.logger.debug(
            `Job Result: ${result.toString()}`,
        );
    }

    @OnQueueFailed()
    public onError(job: QueueJob<Job>, error: Error): void {

        this.jobService.markJobAsFailed(
            job.data.id,
            error,
        );

        this.logger.debug(
            `Complete job with error: Internal ID - ${job.id}, External ID - ${job.data.id}, of type ${job.name}.`,
        );
    }

    // @Process('fetch_manufacturers_from_onliner')
    // public async fetchManufacturersFromOnliner(): Promise<Array<number>> {
    //
    // }

    @Process('fetch_cars_from_onliner')
    public async fetchCarsFromOnliner(job: QueueJob<Job>): Promise<Array<number>> {

        const platformPages: number = 200;

        const amountOfPages: IterableIterator<number> = Array.from(
            Array(platformPages),
        ).keys();

        const job_data: Array<number> = Array.from<number>(
            [],
        );

        try {

            for (const pageNumber of amountOfPages) {

                this.logger.debug(
                    `Processing page iteration with page ${pageNumber}.`,
                );

                /**
                 * TODO: Replace for real action.
                 */
                await new Promise(
                    (resolve) => setTimeout((): void => {

                        job_data.push(pageNumber);

                        resolve();

                    }, 5000),
                );

                const jobProgress: number =
                    (pageNumber * 100) / platformPages;

                this.logger.debug(
                    `Current job: Internal ID - ${job.id}, External ID - ${job.data.id}, progress ${jobProgress}.`,
                );

                await job.progress(jobProgress);

                await this.jobService.updateJobProgress(
                    job.data.id,
                    jobProgress,
                    false,
                    null,
                    null,
                );

            }

            return job_data;

        } catch (error) {
            await job.moveToFailed(error);
        }
    }
}
