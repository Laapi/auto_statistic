import {
    OnQueueCompleted,
    OnQueueActive,
    OnQueueFailed,
    Processor,
    Process,
} from '@nestjs/bull';

import { LoggerService, Logger, Inject } from '@nestjs/common';

import { JOB_SERVICE } from '@platform/auto/data/ioc/constants';

import { IJobService } from '@platform/auto/data/contracts/services/IJobService';
import { IJob } from '@platform/auto/data/contracts/IJob';

import { JobType } from '@platform/auto/data/enum/JobType';


import { Job } from 'bull';

@Processor('job_queue')
export class JobProcessor {

    private readonly logger: LoggerService;

    public constructor(
        @Inject(JOB_SERVICE)
        private readonly jobService: IJobService,
    ) {
        this.logger = new Logger(JobProcessor.name);
    }

    @OnQueueActive()
    public async onActive(job: Job<IJob>): Promise<void> {

        /**
         * Create job in database.
         */
        const job_entity: IJob = await this.jobService.createJob(
            job.id,
            job.data.jobType,
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
    public onCompleted(job: Job<IJob>, result: Array<unknown>): void {

        this.jobService.finishJob<unknown>(
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
    public onError(job: Job<IJob>, error: Error): void {

        this.jobService.markJobAsFailed(
            job.data.id,
            error,
        );

        this.logger.debug(
            `Complete job with error: Internal ID - ${job.id}, External ID - ${job.data.id}, of type ${job.name}.`,
        );
    }

    @Process('job_processor')
    public async fetchCarsFromOnliner(job: Job<IJob>): Promise<Array<number>> {

        const job_data: Array<number> = Array.from<number>(
            [],
        );

        try {

            switch (job.data.jobType) {

            case JobType.COLLECT_CAR_ADVERTS_FROM_ONLINER: {
                break;
            }

            case JobType.COLLECT_CAR_MANUFACTURERS_FROM_ONLINER: {
                break;
            }

            }

            const platformPages: number = 200;

            const amountOfPages: IterableIterator<number> = Array.from(
                Array(platformPages),
            ).keys();

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
                );

            }

            return job_data;

        } catch (error) {
            await job.moveToFailed(error);
        }
    }
}
