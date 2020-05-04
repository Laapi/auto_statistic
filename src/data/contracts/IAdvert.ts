import { ICar } from '@platform/auto/data/contracts/ICar';

import { SellerType } from '@platform/auto/data/enum/car/SellerType';
import { Country } from '@platform/auto/data/enum/car/Country';

export interface IAdvert {

    readonly externalId: number;

    readonly title: string;

    readonly price: number;

    readonly upCounter: number;

    readonly country: Country;

    readonly premium: boolean;

    readonly externalCreatedAt: number;

    readonly externalUpdatedAt: number;

    readonly sellerType: SellerType;

    readonly car: ICar;
}
