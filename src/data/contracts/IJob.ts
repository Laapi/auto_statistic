import { JobStatus } from '@platform/auto/data/enum/JobStatus';
import { JobType } from '@platform/auto/data/enum/JobType';

import { IRunable } from '@platform/auto/data/contracts/base/IRunable';
import { IEntity } from '@platform/auto/data/contracts/base/IEntity';

export interface IJob extends IEntity, IRunable {

    readonly jobID: string;

    readonly jobProgress: number;

    readonly jobType: JobType;

    readonly jobStatus: JobStatus;
}
