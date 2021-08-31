import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThan, InsertResult } from 'typeorm';
import { Ecgdata12 } from './ecgdata12.entity';
import { User } from '../users/user.entity';
import { Ecg3_raw } from '../users/ecg3_raw.entity';
import { Ecgrealtime3 } from '../ecgrealtime3/ecgrealtime3.entity';
import { UserService } from 'src/users/user.service';
import { ApiAcceptedResponse } from '@nestjs/swagger';

const sample_rate=256;
@Injectable()
export class Ecgdata12Service {
  constructor(
    @InjectRepository(Ecgdata12)
    private readonly ecgdata12Repository: Repository<Ecgdata12>,
    @InjectRepository(Ecgrealtime3)
    private readonly ecgrealtime3Repository: Repository<Ecgrealtime3>,
	    @InjectRepository(Ecg3_raw)
	    private readonly ecg3_rawRepository: Repository<Ecg3_raw>,
	    @InjectRepository(User)
    private readonly userRepository: Repository<User>,	    
	    private readonly userService: UserService
  ) { }
    
  async createEcgdata12(params): Promise<InsertResult> {
    return await this.ecgdata12Repository.createQueryBuilder()
      .insert()
      .into(Ecgdata12)
      .values(params)
      .execute();
  }

  async findEcgdata12ByUser(params) {
    // find all
    params.from=parseInt(params.from);
    params.to=parseInt(params.to);

    //if (!params.from && !params.limit && !params.to)
		
    //  return await this.ecgdata12Repository.find({user: { userId: params.id }});
var start=new Date().getTime();
var total_packetaaa: any = [];
      const query: any = {
      where: {  Patient_CodeID : params.id },
      order: { Ecg_time: 'DESC' },
      };
      query.take=1;
var check;       
check = await this.userRepository.findOne({where:{userId:params.id}});
if(!check) {
console.log("No this user");
return "No this user";
}
if(params.to) {
console.log(456);
console.log(Math.floor(params.from));
console.log(Math.floor(params.to));
query.where.Ecg_time= {$gte:Math.floor(params.from) , $lt:Math.floor(params.to)};
query.take=5;
    }
    else if(params.from) {
    console.log('Load 3leads');
     query.where.Ecg_time= {$gte:(params.from), $lt:(params.from+5)};
     query.take=5;
      }
      else if(params.from==0){
      query.take=0;
    console.log("null time");
    var temp={
    'userId':params.id,
    'time':check.lasttime_3lead-5,
      'I':null,
      'II':null,
      'III':null,
      'V1':null,
      'V2':null,
      'V3':null,
      'V4':null,
      'V5':null,
      'V6':null,
      'aVR':null,
      'aVL':null,
      'aVF':null,
      }
      total_packetaaa.push(temp);
    return total_packetaaa;
    }
    else{
    return 0;}
       //query.where.Ecg_time=_get.Ecg_time;
       var _get = await this.ecgrealtime3Repository.find(query);
       //	query.where.Ecg_time=_get2.Ecg_time;
       var _get2 = await this.ecg3_rawRepository.find(query); 

       if(!_get[0]){
       console.log(999);
	var t_time;
	var last=Math.floor(check.lasttime_3lead);
	if(params.from<last-5){
	t_time=last-5;
	}
	else {
	t_time=params.from;
	}
	total_packetaaa[0]={
	'userId':params.id,
	'time':t_time,
        'I':null,
        'II':null,
        'III':null,
        'V1':null,
        'V2':null,
        'V3':null,
        'V4':null,
        'V5':null,
        'V6':null,
        'aVR':null,
        'aVL':null,
        'aVF':null,
        } 
    return total_packetaaa;
    }


  
    //if (Boolean((await this.userService.getUserById(params.id)).userId ))
    //var _get = await this.ecgrealtime3Repository.findOne(query);
    //var sss="test time  " + _get2[0].Ecg_time;
    //console.log(sss);
  var cnt=0;
  var packet_cnt=0;
  var total_packet:any = [];
  
  var I: Ecgdata12[] = [];
  var II: Ecgdata12[] = [];
  var III: Ecgdata12[] = [];
  var V1: Ecgdata12[] = [];
  var V2: Ecgdata12[] = [];
  var V3: Ecgdata12[] = [];
  var V4: Ecgdata12[] = [];
  var V5: Ecgdata12[] = [];
  var V6: Ecgdata12[] = [];
  var aVR: Ecgdata12[] = [];
  var aVL: Ecgdata12[] = [];
  var aVF: Ecgdata12[] = [];
  var time=params.from+4;
  var lost = 0;
  for(var p=0;p<5;p++) {
  var d1:any=[];
  var d2:any=[];
  var d3:any=[];
  var a1:any=[];
  var a2:any=[];
  var a3:any=[];
  //var blank:any=[];
  //query.where.Ecg_time=_get.Ecg_time;
  //var _get2 = await this.ecgrealtime3Repository.findOne(query);
   
  //var z=new Array(256).fill(0.0);
  //z=z.map(x=>x.toFixed(2));
  if(_get[p]) {
  //console.log(_get[p].Ecg_time);
  //console.log(time);
  lost=time-_get[p].Ecg_time;
  //console.log(lost);
  d1=d1.concat(_get[p].Diff_1);
  d2=d2.concat(_get[p].Diff_2);
  d3=d3.concat(_get[p].Diff_3);
  d1=d1.map(x=>x.toFixed(3));
  d2=d2.map(x=>x.toFixed(3));
  d3=d3.map(x=>x.toFixed(3));
  a1=a1.concat(_get2[p].Diff_1);
  a2=a2.concat(_get2[p].Diff_2);
  a3=a3.concat(_get2[p].Diff_3);
  a1=a1.map(x=>(x*1000).toFixed(3));
  a2=a2.map(x=>(x*1000).toFixed(3));
  a3=a3.map(x=>(x*1000).toFixed(3));

  //_get.Diff_3=_get.Diff_3.map(x=>x*1000);
    total_packet[p]={
    'userId':params.id,
    'time':_get2[p].Ecg_time+1,
      'I':a1,
      'II':a1,
      'III':a1,
      'V1':a1,
      'V2':d1,
      'V3':a2,
      'V4':d2,
      'V5':a3,
      'V6':d3,
      'aVR':a1,
      'aVL':a1,
      'aVF':a1, 
      }
      //console.log('lost' + lost);
      for(var l=lost-1;l>=0;l--) {
	      console.log('lost');
	      console.log(lost);
	      console.log(time+l+1);
	      //var blank:any=[]
	 var blank ={
        'userId':params.id,
        'time':time+l+1,
        'I':10,
        'II':10,
        'III':10,
        'V1':10,
        'V2':10,
        'V3':10,
        'V4':10,
        'V5':10,
        'V6':10,
        'aVR':10,
        'aVL':10,
        'aVF':10,
	}
	//console.log(blank.userId);
	console.log(total_packetaaa.length);
	total_packetaaa.push(blank);
	console.log(total_packetaaa.length);
	    }

	    time=_get2[p].Ecg_time-1;
    //var text="Draw "+_get.Ecg_time;
    //	console.log(text);   
    total_packetaaa.push(total_packet[p]);
    }


 }   
    
    
var end=new Date().getTime();
console.log("test "+_get.length+' , '+params.from);
    return total_packet;
  }

  async deleteEcgdata12ByUser(user){
    return await this.ecgdata12Repository.delete({user});
  }
}
