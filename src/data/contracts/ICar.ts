import { IManufacturer } from '@platform/auto/data/contracts/IManufacturer';
import { IGeneration } from '@platform/auto/data/contracts/IGeneration';
import { IModel } from '@platform/auto/data/contracts/IModel';

import { Transmission } from '@platform/auto/data/enum/car/Transmission';
import { UsageState } from '@platform/auto/data/enum/car/UsageState';
import { EngineType } from '@platform/auto/data/enum/car/EngineType';
import { DriveTrain } from '@platform/auto/data/enum/car/DriveTrain';
import { BodyType } from '@platform/auto/data/enum/car/BodyType';
import { Color } from '@platform/auto/data/enum/car/Color';

export interface ICar {

    readonly year: number;

    readonly odometer: number;

    readonly manufacturer: IManufacturer;

    readonly model: IModel;

    readonly generation: IGeneration;

    readonly body: BodyType;

    readonly engineType: EngineType;

    readonly engineCapacity: number;

    readonly color: Color;

    readonly transmission: Transmission;

    readonly driveTrain: DriveTrain;

    readonly state: UsageState;
}
