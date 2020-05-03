import { Module } from '@nestjs/common';

import { ApplicationController } from '@platform/auto/application.controller';
import { ApplicationService } from '@platform/auto/application.service';

@Module({
    imports: [],
    controllers: [ApplicationController],
    providers: [ApplicationService],
})
export class ApplicationModule {}
