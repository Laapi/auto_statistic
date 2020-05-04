import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { JobStatus } from '@platform/auto/data/enum/JobStatus';
import { JobType } from '@platform/auto/data/enum/JobType';
import { Job } from '@platform/auto/data/entities/Job';

import * as t from 'dayjs';
import * as _ from 'lodash';

@Injectable()
export class JobService {

    public constructor(
        @InjectRepository(Job)
        private jobRepository: Repository<Job>,
    ) {}

    public async createJob(id: string | number, type: JobType): Promise<Job> {

        const current_date: number =
            t().unix();

        const job: Job =
            new Job(
                id as string,
                type, current_date,
            );

        return this.jobRepository.create(job);
    }

    public async finishJob<T>(id: string, result: Array<T>): Promise<void> {
        await this.updateJobProgress<T>(
            id,
            100,
            false,
            null,
            result,
        );
    }

    public async markJobAsFailed<T>(id: string, error: Error): Promise<void> {
        await this.updateJobProgress<T>(
            id,
            100,
            true,
            error,
            null,
        );
    }

    public async updateJobProgress<T>(
        id: string,
        progress: number,
        isFailed: boolean = false,
        error: Error,
        result: Array<T>,
    ): Promise<void> {

        const current_job: Job = await this.jobRepository.findOne(
            { id: id },
        );

        if (current_job) {

            const current_date: number = t()
                .unix();

            const is_job_finished: boolean = _.isEqual(
                progress,
                100,
            );

            const time_difference: number = t(current_job.timeOfActivate)
                .subtract(current_date, 'second')
                .unix();

            const mutation: Partial<Job> = {
                jobProgress: progress,
                timeOfEllapsed: time_difference,
            };

            if (is_job_finished) {

                /**
                 * If Job progress equals 100 - define job finish time and status.
                 */

                Object.defineProperties(
                    mutation,
                    {
                        timeOfComplete: {
                            value: current_date,
                        },
                        jobStatus: {
                            value: isFailed ?
                                JobStatus.FAILED : JobStatus.COMPLETED,
                        },
                    },
                );

                if (error) {
                    Object.defineProperty(
                        mutation,
                        'error',
                        error,
                    );
                }

                if (result) {
                    Object.defineProperty(
                        mutation,
                        'result',
                        result.length,
                    );
                }

            }

            const mutated_job: Job = Object.assign(
                current_job,
                mutation,
            );

            await this.jobRepository.update(
                { id: id },
                mutated_job,
            );
        }
    }
}
