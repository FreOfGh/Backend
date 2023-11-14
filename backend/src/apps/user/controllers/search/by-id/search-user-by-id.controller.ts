import {AppController} from '../../../../shared/controllers/app.controller';
import {Controller, Get, UseGuards} from '@nestjs/common';
import {UserConfigConstants} from '../../../config/user.config.constants';
import {ApiAcceptedResponse, ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtGuard} from '../../../../../contexts/user/infrastructure/passport/jwt.guard';
import {SearchUserByIdControllerResponse} from './search-user-by-id.controller.response';
import {IUserDecorator, User} from '../../../../../contexts/user/domain/user.decorator';
import {UserDto} from '../../../../../contexts/user/domain/user.dto';
import {SearchUserByIdQuery} from '../../../../../contexts/user/application/search/by-id/search-user-by-id.query';

@Controller(UserConfigConstants.CONTROLLER_PREFIX)
@ApiTags(UserConfigConstants.API_TAG)
@ApiBearerAuth()
export class SearchUserByIdController extends AppController {

    @Get(UserConfigConstants.GET_USER_BY_ID)
    @UseGuards(JwtGuard)
    @ApiAcceptedResponse({type: SearchUserByIdControllerResponse})
    async controller(@User() user: IUserDecorator): Promise<SearchUserByIdControllerResponse> {
        const response: SearchUserByIdControllerResponse = new SearchUserByIdControllerResponse();
        response.data = await this.query<UserDto, SearchUserByIdQuery>(new SearchUserByIdQuery(user.userId));
        return response;
    }
}