import { Test, TestingModule } from '@nestjs/testing';

import { ApplicationController } from '@platform/auto/application.controller';
import { ApplicationService } from '@platform/auto/application.service';

describe('Application Controller', () => {

    let applicationController: ApplicationController;

    beforeEach(
        async (): Promise<void> => {

            const application: TestingModule = await Test.createTestingModule({
                controllers: [ApplicationController],
                providers: [ApplicationService],
            }).compile();

            applicationController = application.get<ApplicationController>(
                ApplicationController,
            );
        },
    );

    describe('Application:', (): void => {

        it('Should return "Hello World!"', (): void => {

            expect(
                applicationController.getHello(),
            ).toBe('Hello World!');

        });

    });
});
