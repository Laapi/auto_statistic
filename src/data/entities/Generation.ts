import { Entity, Column, ManyToOne } from 'typeorm';

import { IGeneration } from '@platform/auto/data/contracts/IGeneration';
import { IEntity } from '@platform/auto/data/contracts/base/IEntity';

import { Model } from '@platform/auto/data/entities/Model';
import { IModel } from '@platform/auto/data/contracts/IModel';

@Entity('generations')
export class Generation implements IEntity, IGeneration {

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
     * #region IGeneration
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
        () => Model,
        (model: IModel) => model.generations,
    )
    public readonly model: IModel;

    @Column('varchar', {
        name: 'manufactured_from_year',
        nullable: true,
    })
    public readonly manufacturedFromYear: number;

    @Column('varchar', {
        name: 'manufactured_to_year',
        nullable: true,
    })
    public readonly manufacturedToYear: number;

}
