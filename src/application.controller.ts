import { Controller, Get } from '@nestjs/common';

import { ApplicationService } from '@platform/auto/application.service';

@Controller()
export class ApplicationController {
    public constructor(
        private readonly applicationService: ApplicationService,
    ) {}

    @Get()
    public getHello(): string {
        return this.applicationService.getHello();
    }
}
