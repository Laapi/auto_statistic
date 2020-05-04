import { Entity, Column } from 'typeorm';

import { IRunable } from '@platform/auto/data/contracts/base/IRunable';
import { IEntity } from '@platform/auto/data/contracts/base/IEntity';
import { IJob } from '@platform/auto/data/contracts/IJob';

import { JobStatus } from '@platform/auto/data/enum/JobStatus';
import { JobType } from '@platform/auto/data/enum/JobType';

import { Min, Max, IsInt, IsDate } from 'class-validator';

@Entity('jobs')
export class Job implements IEntity, IRunable, IJob {

    public constructor(
        jobID: string,
        jobType: JobType,
        timeOfActivate: number,
    ) {
        this.jobID = jobID;
        this.jobType = jobType;
        this.timeOfActivate = timeOfActivate;
    }

    /**
     * #region IEntity
     */

    @Column('uuid', {
        name: 'id',
        primary: true,
        nullable: false,
        generated: true,
    })
    public readonly id: string;

    /**
     * #region IJob
     */

    @Column('string', {
        name: 'job_id',
        nullable: false,
    })
    public readonly jobID: string;

    @Column('number', {
        name: 'job_progress',
        default: 0,
        nullable: false,
    })
    @IsInt()
    @Min(0)
    @Max(100)
    public readonly jobProgress: number;

    @Column({
        name: 'job_type',
        type: 'enum',
        nullable: false,
        enum: JobType,
        default: JobType.FETCH_CARS_FROM_ONLINER,
    })
    public readonly jobType: JobType;

    @Column({
        name: 'job_status',
        type: 'enum',
        nullable: false,
        enum: JobStatus,
        default: JobStatus.CREATED,
    })
    public readonly jobStatus: JobStatus;

    /**
     * #region IRunable
     */

    @Column('date', {
        name: 'activated_at',
        nullable: true,
    })
    @IsDate()
    public readonly timeOfActivate: number;

    @Column('date', {
        name: 'ellapsed_time',
        nullable: true,
    })
    @IsDate()
    public readonly timeOfEllapsed: number;

    @Column('date', {
        name: 'completed_at',
        nullable: true,
    })
    @IsDate()
    public readonly timeOfComplete: number;

}
