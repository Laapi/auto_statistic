import { Entity, Column, OneToMany } from 'typeorm';

import { IManufacturer } from '@platform/auto/data/contracts/IManufacturer';
import { IEntity } from '@platform/auto/data/contracts/base/IEntity';
import { IModel } from '@platform/auto/data/contracts/IModel';

import { Model } from '@platform/auto/data/entities/Model';

@Entity('manufacturers')
export class Manufacturer implements IEntity, IManufacturer {

    /**
     * #region IEntity
     */

    @Column('uuid', {
        name: 'id',
        primary: true,
        nullable: false,
        generated: true,
    })
    public readonly id: string;

    /**
     * #region IManufacturer
     */

    @Column('varchar', {
        name: 'name',
        nullable: false,
    })
    public readonly name: string;

    @Column('varchar', {
        name: 'slug',
        nullable: false,
    })
    public readonly slug: string;

    @OneToMany(
        () => Model,
        (model: IModel) => model.manufacturer,
    )
    public readonly models: Array<IModel>;

}
