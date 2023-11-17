import {AppController} from '../../../../shared/controllers/app.controller';
import {Controller, Get, UseGuards} from '@nestjs/common';
import {PlayerConfigConstants} from '../../../config/player.config.constants';
import {ApiAcceptedResponse, ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtGuard} from '../../../../../contexts/user/infrastructure/passport/jwt.guard';
import {SearchPlayerByUserControllerResponse} from './search-player-by-user.controller.response';
import {IUserDecorator, User} from '../../../../../contexts/user/domain/user.decorator';
import {PlayerDto} from '../../../../../contexts/player/domain/player.dto';
import {
    SearchPlayerByUserQuery
} from '../../../../../contexts/player/application/search/by-user/search-player-by-user.query';

@Controller(PlayerConfigConstants.CONTROLLER_PREFIX)
@ApiTags(PlayerConfigConstants.API_TAG)
@ApiBearerAuth()
export class SearchPlayerByUserController extends AppController {

    @Get(PlayerConfigConstants.SEARCH_BY_USER)
    @UseGuards(JwtGuard)
    @ApiAcceptedResponse({type: SearchPlayerByUserControllerResponse})
    async controller(@User() user: IUserDecorator): Promise<SearchPlayerByUserControllerResponse> {
        const response: SearchPlayerByUserControllerResponse = new SearchPlayerByUserControllerResponse();
        response.data = await this.query<PlayerDto, SearchPlayerByUserQuery>(new SearchPlayerByUserQuery(user.userId));
        return response;
    }
}