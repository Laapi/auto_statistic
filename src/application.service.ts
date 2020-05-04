import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationService {

    public getHello(): string {
        return 'Hello World!';
    }
}
