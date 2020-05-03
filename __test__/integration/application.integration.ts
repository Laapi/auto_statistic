import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import * as request from 'supertest';

import { ApplicationModule } from '@platform/auto/application.module';

describe('Application Controller (e2e)', () => {
    let application: INestApplication;

    beforeEach(
        async (): Promise<void> => {
            const moduleFixture: TestingModule = await Test.createTestingModule(
                {
                    imports: [ApplicationModule],
                },
            ).compile();

            application = moduleFixture.createNestApplication();

            await application.init();
        },
    );

    it('/ (GET)', (): Test => {
        return request(application.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });
});
