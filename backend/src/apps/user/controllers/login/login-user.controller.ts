import {Controller, Logger, Post, UseGuards} from '@nestjs/common';
import {AppController} from '../../../shared/controllers/app.controller';
import {UserConfigConstants} from '../../config/user-config.constants';
import {ApiAcceptedResponse, ApiTags} from '@nestjs/swagger';
import {LoginGuard} from '../../../../contexts/user/infrastructure/passport/login.guard';
import {User} from '../../../../contexts/user/domain/user.decorator';
import {UserDto} from '../../../../contexts/user/domain/user.dto';
import {LoginUserControllerResponse} from './login-user.controller.response';
import {BuildAccessInfoCommand} from '../../../../contexts/user/application/build/build-access-info.command';
import {BuildAccessInfoAppResponse} from '../../../../contexts/user/application/build/build-access-info.app.response';

@Controller(UserConfigConstants.CONTROLLER_PREFIX)
@ApiTags(UserConfigConstants.API_TAG)
export class LoginUserController extends AppController {

    protected readonly logger: Logger = new Logger(LoginUserController.name);

    @Post(UserConfigConstants.LOGIN_USER_URL)
    @UseGuards(LoginGuard)
    @ApiAcceptedResponse({type: LoginUserControllerResponse})
    async controller(@User() user: UserDto): Promise<LoginUserControllerResponse> {
        const response: LoginUserControllerResponse = new LoginUserControllerResponse();
        response.data = await this.dispatch<BuildAccessInfoAppResponse, BuildAccessInfoCommand>(new BuildAccessInfoCommand(user));
        return response;
    }
}