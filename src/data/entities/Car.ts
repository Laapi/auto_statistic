import { OneToOne, JoinColumn, Entity } from 'typeorm';

import { Manufacturer } from '@platform/auto/data/entities/Manufacturer';
import { Generation } from '@platform/auto/data/entities/Generation';
import { Model } from '@platform/auto/data/entities/Model';

import { IManufacturer } from '@platform/auto/data/contracts/IManufacturer';
import { IGeneration } from '@platform/auto/data/contracts/IGeneration';
import { IModel } from '@platform/auto/data/contracts/IModel';
import { ICar } from '@platform/auto/data/contracts/ICar';

@Entity('cars')
export class Car implements ICar {

    @OneToOne(
        () => Manufacturer,
    )
    @JoinColumn({
        name: 'manufacturer',
        referencedColumnName: 'advert_car_manufacturer',
    })
    public readonly manufacturer: IManufacturer;

    @OneToOne(
        () => Model,
    )
    @JoinColumn({
        name: 'model',
        referencedColumnName: 'advert_car_model',
    })
    public readonly model: IModel;

    @OneToOne(
        () => Generation,
    )
    @JoinColumn({
        name: 'generation',
        referencedColumnName: 'advert_car_generation',
    })
    public readonly generation: IGeneration;
}
