import { Controller, Get, Post, Param, Query, Body, HttpException, HttpStatus, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../users/user.entity';
import { UserParams } from './view-models/user-params.model';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@Controller()
//@ApiTags(User.name)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('users')
    //@ApiQuery({ name: 'userId', required: false })
    findAll(@Query() query): Promise<User[]> {
        //if (userId) {
        //    return this.userService.findByUserid(userId);
       // }
        return this.userService.findAll();
    }

    @Get('users/:userId')
    getUserById(@Param('userId') userId:string) {
        return this.userService.getUserById(userId);
	}

    @Get('users/status/:userId')
    getUserStatus(@Param('userId') userId:string) {
        return this.userService.getuserStatus(userId);
    }

    @Post('users')
    createUser(@Body() params: UserParams): Promise<User> {
        return this.userService.createOne(params);
    }

    @Put('users/:agentid/:patient_code/:status')
    userUpdateStatus(@Param('agentid') agentid:string,
    		     @Param('patient_code') patient_code:string,
                     @Param('status') status:string,
		     )  {
	console.log(agentid);
	console.log(patient_code);
	console.log(status);
         return this.userService.updateStatus(agentid, patient_code, status);
	 }

  @Get('users/model/:patient_code/:model/:status')
  userUpdateModel(
    		     @Param('patient_code') patient_code:string,
             @Param('model') model:string,
             @Param('status') status:string,
		     )  {
	console.log("change "+patient_code+" "+model+" to "+status);
         return this.userService.updateModel(patient_code, model, status);
	 }

	
}
