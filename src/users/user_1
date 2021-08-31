import { Injectable, ParseArrayPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Ecgrealtime3Service } from '../ecgrealtime3/ecgrealtime3.service';
import { Ecgrealtime3 } from '../ecgrealtime3/ecgrealtime3.entity';
import { Ecg3_raw } from './ecg3_raw.entity';
import { promises } from 'dns';
import { threadId } from 'worker_threads';
import { timer } from 'rxjs';
import {fftConvolution,directConvolution} from 'ml-convolution';
const fetch = require("node-fetch");
const kernel= [ -0.00611779802346922, -0.00625504233834900, -0.00639124756152272,
			-0.00652632292468917, -0.00666017805064469, -0.00679272303124695, -0.00692386850516743,
			-0.00705352573535570, -0.00718160668613947, -0.00730802409988414, -0.00743269157313628,
			-0.00755552363217547, -0.00767643580789987, -0.00779534470997097, -0.00791216810014414,
			-0.00802682496471177, -0.00813923558598708, -0.00824932161275723, -0.00835700612963550,
			-0.00846221372524318, -0.00856487055915309, -0.00866490442752768, -0.00876224482738604,
			-0.00885682301943527, -0.00894857208940331, -0.00903742700781158, -0.00912332468812740,
			-0.00920620404323762, -0.00928600604018690, -0.00936267375312517, -0.00943615241441123,
			-0.00950638946382088, -0.00957333459580983, -0.00963693980478395, -0.00969715942833094,
			-0.00975395018836987, -0.00980727123017687, -0.00985708415924788, -0.00990335307596067,
			-0.00994604460800137, -0.00998512794052290, -0.0100205748440041, -0.0100523596997823, -0.0100804595232325,
			-0.0101048539845701, -0.0101255254272568, -0.0101424588839894, -0.0101556420902573, -0.0101650654954525,
			-0.0101707222715238, 0.989827391680836, -0.0101707222715238, -0.0101650654954525, -0.0101556420902573,
			-0.0101424588839894, -0.0101255254272568, -0.0101048539845701, -0.0100804595232325, -0.0100523596997823,
			-0.0100205748440041, -0.00998512794052290, -0.00994604460800137, -0.00990335307596067, -0.00985708415924788,
			-0.00980727123017687, -0.00975395018836987, -0.00969715942833094, -0.00963693980478395,
			-0.00957333459580983, -0.00950638946382088, -0.00943615241441123, -0.00936267375312517,
			-0.00928600604018690, -0.00920620404323762, -0.00912332468812740, -0.00903742700781158,
			-0.00894857208940331, -0.00885682301943527, -0.00876224482738604, -0.00866490442752768,
			-0.00856487055915309, -0.00846221372524318, -0.00835700612963550, -0.00824932161275723,
			-0.00813923558598708, -0.00802682496471177, -0.00791216810014414, -0.00779534470997097,
			-0.00767643580789987, -0.00755552363217547, -0.00743269157313628, -0.00730802409988414,
			-0.00718160668613947, -0.00705352573535570, -0.00692386850516743, -0.00679272303124695,
			-0.00666017805064469, -0.00652632292468917, -0.00639124756152272, -0.00625504233834900,
			-0.00611779802346922 ];
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Ecgrealtime3)
    private readonly ecgrealtime3Repository: Repository<Ecgrealtime3>,
    @InjectRepository(Ecg3_raw)
    private readonly ecg3_rawRepository: Repository<Ecg3_raw>,   
    private readonly ecgrealtime3Service: Ecgrealtime3Service
  ) { }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

    async getUserById(id:number): Promise<User> {
        return await this.userRepository.findOne({ 'userId': id } );
	}
    async getuserStatus(id:number){
    //var start=new Date().getTime();
    var _get=await this.userRepository.findOne({ 'userId': id } );
	const query: any = {
      where: { 'Patient_CodeID'  : id },
      order: { 'Ecg_time': 'DESC' },
      };
      query.take=1;
      var tmp=await this.ecg3_rawRepository.findOne(query);
      if(tmp) {
      var res=_get.Status+','+tmp.Ecg_time;
      //var end=new Date().getTime();
      //console.log(end-start);
      return res;
      }
      else {
      var res2=_get.Status+','+9999999999;
      return res2;
      }
  }


  //async findByUserid(userId: string): Promise<User[]> {
  //  return await this.userRepository.find(userId);
 // }

  async createOne(user): Promise<User> {
	  user.userId=parseInt(user.userId);
	  user.Status=parseInt(user.Status);
	  user.Status_time=user.Status_time*1;
    const Isuser = await this.userRepository.findOne({ userId: user.userId });
    if (!Isuser) {
      return await this.userRepository.save(user);
    }
	
  }

  async updateStatus(patient_code,status) {
    console.log("Status update");
    patient_code=parseInt(patient_code);
    status=parseInt(status);
    var Visible=0;
    var tp=0;
    if (status==1) Visible=1;
    else Visible=0;

    if(status) tp=1;
     await this.userRepository.update({userId:patient_code} , {Status_time:Date.now()});
    await this.userRepository.update({userId:patient_code} , {Status : tp} );
    await this.userRepository.update({userId:patient_code} , {visible : Visible} );
    var s="Status update to "+status;
    return s;
      }

     async  update3leads(param) {
     
      var start=new Date().getTime();
      var check_status = await this.userRepository.findOne({userId:param.Patient_CodeID});
      param.Ecg_time=parseInt(param.Ecg_time);
      if (check_status.Status) {
      	var data:any=[];
      	var gain_offset=4;
      	var scale=2.4/3.5/Math.pow(2,22)*128/gain_offset;
      	var reg1=param.Diff_1.split(",");
      	var t=reg1[0];
      	t=parseInt(t);
      	var reg2=param.Diff_2.split(",");
      	var reg3=param.Diff_3.split(",");
      	var d1:any=[];
      	var d2:any=[];
      	var d3:any=[];
      	var l = Math.floor(kernel.length/2);
      	var z=Array(l).fill(0);
      	const query: any = {
      		where: {  Patient_CodeID : param.Patient_CodeID },
      	};
      	query.where.Ecg_time=t;
      	var check = await this.ecg3_rawRepository.findOne(query);
      	var ex="already exist";
      	if(check) {
        	console.log(ex);
	//return ex;
	}
      	else {
		query.where.Ecg_time=t-1;
      		var _get = await this.ecg3_rawRepository.findOne(query);
      		query.where.Ecg_time=t-2;
      		var _get2 = await this.ecg3_rawRepository.findOne(query);
      		for (var i =0; i < reg1[1].length;i=i+4) {
        		var tmp='0x'+reg1[1][i]+reg1[1][i+1]+reg1[1][i+2]+reg1[1][i+3];
        		var trans=parseInt(tmp,16);
        		if ((trans & 0x8000) > 0) {
          			trans = trans - 0x10000;
       			}
        		trans=trans*scale;
        		d1.push(trans);
        		tmp='0x'+reg2[1][i]+reg2[1][i+1]+reg2[1][i+2]+reg2[1][i+3];
        		trans=parseInt(tmp,16);
        		if ((trans & 0x8000) > 0) {
          			trans = trans - 0x10000;
       			}
        		trans=trans*scale;
        		d2.push(trans);
        		tmp='0x'+reg3[1][i]+reg3[1][i+1]+reg3[1][i+2]+reg3[1][i+3];
        		trans=parseInt(tmp,16);
        		if ((trans & 0x8000) > 0) {
          			trans = trans - 0x10000;
       			}
        		trans=trans*scale;
        		d3.push(trans);
		}
		var raw:any=[];
        	raw={
        		Data_Point_Amount: param.Data_Point_Amount,
        		Date:param.Date,
        		Ecg_time:t,
        		Current_time:Date.now(),
        		Diff_1:d1,
        		Diff_2:d2,
        		Diff_3:d3,
        		Patient_CodeID:param.Patient_CodeID,
        		RPN_Id:param.RPN_Id,
        		Result:param.Result,
        		Message:param.Message,
		}
		await this.ecg3_rawRepository.save(raw);
		console.log('ECG: '+raw.Ecg_time+', API: '+raw.Date+' ,GPU: '+raw.Current_time+' ,ECG->API: '+(raw.Date-raw.Ecg_time*1000)+' ,API->GPU: '+(raw.Current_time-raw.Date));
		if(_get) {
			d1=_get.Diff_1.concat(d1.slice(0,l));
        		d2=_get.Diff_2.concat(d2.slice(0,l));
        		d3=_get.Diff_3.concat(d3.slice(0,l));
	  		if(_get2) {
	  			d1=_get2.Diff_1.slice(-l).concat(d1);
	  			d2=_get2.Diff_2.slice(-l).concat(d2);
	  			d3=_get2.Diff_3.slice(-l).concat(d3);
	  		}
	  		else {
	  			d1=z.concat(d1);
	  			d2=z.concat(d2);
	  			d3=z.concat(d3);
	  		}
		}
		else {
			var ndata="Not enough data";
			console.log(ndata);
			console.log(t);
			var nd = check_status.Status+','+(t+1);
			console.log(nd);
			return nd;
		}
		d1=fftConvolution(d1,kernel);
		d2=fftConvolution(d2,kernel);
		d3=fftConvolution(d3,kernel);
		d1=d1.slice(l,-l);
		d2=d2.slice(l,-l);
		d3=d3.slice(l,-l);
		d1=d1.map(x => x * 1000);
		d2=d2.map(x => x * 1000);
		d3=d3.map(x => x * 1000);
      		data={
        		Data_Point_Amount: param.Data_Point_Amount,
        		Date:param.Date,
        		Ecg_time:t-1,
        		Current_time:Date.now(),
        		Diff_1:d1,
        		Diff_2:d2,
        		Diff_3:d3,
        		Patient_CodeID:param.Patient_CodeID,
        		RPN_Id:param.RPN_Id,
        		Result:param.Result,
        		Message:param.Message,       
      		}
       		await this.ecgrealtime3Service.createEcgrealtime3(data);
       		await this.userRepository.update({userId:data.Patient_CodeID} , {lasttime_3lead:data.Ecg_time, lasttime_Ts:data.Current_time});
       		//this.userRepository.update({userId:data.Patient_CodeID} , {lasttime_Ts:data.Current_time});
       		}
       	}
       	var end = new Date().getTime();
       	console.log('update 3leads , Status: '+check_status.Status+','+(t+1)+','+(end-start));
       	var ss=check_status.Status+','+(t+1);
	return ss;
      }
}
