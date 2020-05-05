import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { IJobService } from '@platform/auto/data/contracts/services/IJobService';
import { IJob } from '@platform/auto/data/contracts/IJob';

import { Job } from '@platform/auto/data/entities/Job';

import { JobStatus } from '@platform/auto/data/enum/JobStatus';
import { JobType } from '@platform/auto/data/enum/JobType';

import * as Time from 'dayjs';
import * as Util from 'lodash';

@Injectable()
export class JobService implements IJobService {

    public constructor(
        @InjectRepository(Job)
        private jobRepository: Repository<IJob>,
    ) {}

    public async createJob(id: string | number, type: JobType): Promise<IJob> {

        const current_date: number =
            Time().unix();

        const job: IJob = new Job(
            id as string,
            type, current_date,
        );

        return this.jobRepository.create(job);
    }

    public async finishJob<T>(id: string, result: T): Promise<void> {
        await this.updateJob<T>(
            id,
            100,
            false,
            null,
            result,
        );
    }

    public async markJobAsFailed(id: string, error: Error): Promise<void> {
        await this.updateJob(
            id,
            100,
            true,
            error,
            null,
        );
    }

    public async updateJobProgress(id: string, progress: number): Promise<void> {
        await this.updateJob(
            id,
            progress,
            false,
            null,
            null,
        );
    }

    private async updateJob<T>(
        id: string,
        progress: number,
        isFailed: boolean = false,
        error: Error,
        result: T,
    ): Promise<void> {

        const current_job: IJob = await this.jobRepository.findOne(
            { id: id },
        );

        if (current_job) {

            const current_date: number = Time()
                .unix();

            const is_job_finished: boolean = Util.isEqual(
                progress,
                100,
            );

            const time_difference: number = Time(current_job.timeOfActivate)
                .subtract(current_date, 'second')
                .unix();

            const mutation: Partial<IJob> = {
                jobProgress: progress,
                timeOfEllapsed: time_difference,
            };

            if (is_job_finished) {

                /**
                 * If Job progress equals 100 - define job finish time and status.
                 */

                const job_status: JobStatus = isFailed ?
                    JobStatus.FAILED : JobStatus.COMPLETED;

                Object.defineProperties(
                    mutation,
                    {
                        timeOfComplete: {
                            value: current_date,
                        },
                        jobStatus: {
                            value: job_status,
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
                        result,
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
