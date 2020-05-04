import { JobStatus } from '@platform/auto/data/enum/JobStatus';
import { JobType } from '@platform/auto/data/enum/JobType';

export interface IJob {

    readonly jobID: string;

    readonly jobProgress: number;

    readonly jobType: JobType;

    readonly jobStatus: JobStatus;
}
