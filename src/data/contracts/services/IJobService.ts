import { JobType } from '@platform/auto/data/enum/JobType';

import { IJob } from '@platform/auto/data/contracts/IJob';

export interface IJobService {

    createJob(id: string | number, type: JobType): Promise<IJob>;

    finishJob<T>(id: string, result: T): Promise<void>;

    markJobAsFailed(id: string, error: Error): Promise<void>;

    updateJobProgress(id: string, progress: number): Promise<void>;

}
