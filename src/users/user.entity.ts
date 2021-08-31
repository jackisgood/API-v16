import { Entity, Column, PrimaryGeneratedColumn, ObjectID,ObjectIdColumn, OneToMany } from 'typeorm';
import { Ecgdata12 } from '../ecgdata12/ecgdata12.entity';

@Entity('user')
export class User {
  //@PrimaryGeneratedColumn()
  @ObjectIdColumn()
  _id: ObjectID;

    @Column({ type: 'string' })
    userId: string;

    @Column({ type: 'int' })
    Status: number;

    @Column({ type: 'double' })
    Status_time: number;

    @Column({ type:'double' })
    lasttime_3lead:number;

    @Column({ type:'double' })
    lasttime_12lead:number;

    @Column({ type:'double' })
    lasttime_Ts:number;

    @Column({ type:'double' })
    lasttime_3denoised:number;
  
    @Column({ type:'int' })
    visible:number;

    @Column({ type:'double' })
    get_12leads:number;
  
    @Column({ type:'int' })
    Denoise_ON:number;

    @Column({ type:'int' })
    AF_ON:number;

    @Column({ type:'int' })
    MI_ON:number;

    @Column({ type:'int' })
    AF_detect:number;

    @Column({ type:'int' })
    is_detected_mi:number;
}
