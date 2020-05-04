import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

import { IManufacturer } from '@platform/auto/data/contracts/IManufacturer';
import { IGeneration } from '@platform/auto/data/contracts/IGeneration';
import { IEntity } from '@platform/auto/data/contracts/base/IEntity';
import { IModel } from '@platform/auto/data/contracts/IModel';

import { Manufacturer } from '@platform/auto/data/entities/Manufacturer';
import { Generation } from '@platform/auto/data/entities/Generation';

@Entity('models')
export class Model implements IEntity, IModel {

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
     * #region IModel
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

    @ManyToOne(
        () => Manufacturer,
        (manufacturer: IManufacturer) => manufacturer.models,
    )
    public readonly manufacturer: IManufacturer;


    @OneToMany(
        () => Generation,
        (generation: IGeneration) => generation.model,
    )
    public readonly generations: Array<IGeneration>;

}
