import { IModel } from '@platform/auto/data/contracts/IModel';

export interface IGeneration {

    readonly name: string;

    readonly slug: string;

    readonly model: IModel;

    readonly manufacturedFromYear: number;

    readonly manufacturedToYear: number;
}
