import { IManufacturer } from '@platform/auto/data/contracts/IManufacturer';
import { IGeneration } from '@platform/auto/data/contracts/IGeneration';

export interface IModel {

    readonly name: string;

    readonly slug: string;

    readonly generations: Array<IGeneration>;

    readonly manufacturer: IManufacturer;
}
