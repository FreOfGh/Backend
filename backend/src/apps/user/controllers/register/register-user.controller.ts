import {Body, Controller, Post} from '@nestjs/common';
import {AppController} from '../../../shared/controllers/app.controller';
import {UserConfigConstants} from '../../config/user-config.constants';
import {ApiAcceptedResponse, ApiTags} from '@nestjs/swagger';
import {RegisterUserControllerResponse} from './register-user.controller.response';
import {RegisterUserControllerRequest} from './register-user.controller.request';
import {RegisterUserAppResponse} from '../../../../contexts/user/application/register/register-user.app.response';
import {RegisterUserCommand} from '../../../../contexts/user/application/register/register-user.command';

@Controller(UserConfigConstants.CONTROLLER_PREFIX)
@ApiTags(UserConfigConstants.API_TAG)
export class RegisterUserController extends AppController {

    @Post(UserConfigConstants.REGISTER_USER_URL)
    @ApiAcceptedResponse({type: RegisterUserControllerResponse})
    async controller(
        @Body() body: RegisterUserControllerRequest
    ): Promise<RegisterUserControllerResponse> {
        const response: RegisterUserControllerResponse = new RegisterUserControllerResponse();
        response.data = await this.dispatch<RegisterUserAppResponse, RegisterUserCommand>(
            new RegisterUserCommand(
                body.username,
                body.password,
            )
        );
        return response;
    }
}