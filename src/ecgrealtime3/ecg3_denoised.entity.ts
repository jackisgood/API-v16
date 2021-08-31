import { Entity, Column, PrimaryGeneratedColumn, ObjectID, ManyToOne, JoinColumn, Index , ObjectIdColumn} from 'typeorm';

@Entity('ecg3_denoised')
export class Ecg3_denoised {
  //@PrimaryGeneratedColumn()
   @ObjectIdColumn()
  _id: ObjectID;

  //@ManyToOne(type => User, user => user.userId)
  @Column ({ type: 'int' }) Data_Point_Amount:number;
  @Column({ type: 'double' })
  @Index()
  Date: number;
  @Column({ type: 'double' }) Ecg_time:number;
  @Column({ type: 'double' }) Current_time:number;
  

  @Column({ type: 'string' }) Diff_1: string;
  @Column({ type: 'string' }) Diff_2: string;
  @Column({ type: 'string' }) Diff_3: string;
  @Column({ type: 'string' }) Patient_CodeID: string;
  @Column({ type: 'string' }) RPN_Id: string;
  @Column({ type: 'string' }) Result: string;
  @Column({ type: 'string' }) Message: string;

}
