import { Injectable } from '@nestjs/common';

import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';

import { Queue } from 'bull';

@Injectable()
export class ApplicationService {
    public constructor(@InjectQueue('parser') private parseQueue: Queue) {}

    public getHello(): string {
        return 'Hello World!';
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    public parseCars(): void {
        this.parseQueue.add('parse');
    }
}
