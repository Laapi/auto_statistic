import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import { IEntity } from '@platform/auto/data/contracts/base/IEntity';
import { IAdvert } from '@platform/auto/data/contracts/IAdvert';
import { ICar } from '@platform/auto/data/contracts/ICar';

import { Car } from '@platform/auto/data/entities/Car';
import { SellerType } from '@platform/auto/data/enum/car/SellerType';
import { Country } from '@platform/auto/data/enum/car/Country';
import { IsDate } from 'class-validator';

@Entity('adverts')
export class Advert implements IEntity, IAdvert {

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
     * #region IAdvert
     */

    @OneToOne(
        () => Car,
    )
    @JoinColumn({
        name: 'car',
        referencedColumnName: 'advert_car',
    })
    public readonly car: ICar;

    @Column('varchar', {
        name: 'external_id',
        nullable: false,
    })
    public readonly externalId: number;

    @Column('varchar', {
        name: 'title',
        nullable: false,
    })
    public readonly title: string;

    @Column('int', {
        name: 'car_price',
        nullable: false,
    })
    public readonly price: number;

    @Column({
        name: 'seller_type',
        type: 'enum',
        enum: SellerType,
        default: SellerType.INDIVIDUAL,
        nullable: false,
    })
    public readonly sellerType: SellerType;

    @Column({
        name: 'country',
        type: 'enum',
        enum: Country,
        default: Country.BELARUS,
        nullable: false,
    })
    public readonly country: Country;

    @Column('int', {
        name: 'up_counter',
        nullable: false,
    })
    public readonly upCounter: number;

    @Column('boolean', {
        name: 'premium',
        nullable: false,
    })
    public readonly premium: boolean;

    @Column('date', {
        name: 'external_created_at',
        nullable: false,
    })
    @IsDate()
    public readonly externalCreatedAt: number;

    @Column('date', {
        name: 'external_updated_at',
        nullable: true,
    })
    @IsDate()
    public readonly externalUpdatedAt: number;


}
