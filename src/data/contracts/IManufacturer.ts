import { IModel } from '@platform/auto/data/contracts/IModel';

export interface IManufacturer {

    readonly name: string;

    readonly slug: string;

    readonly models: Array<IModel>;
}
