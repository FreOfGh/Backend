import {AppController} from '../../../../shared/controllers/app.controller';
import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {GameConfigConstants} from '../../../config/game.config.constants';
import {ApiAcceptedResponse, ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtGuard} from '../../../../../contexts/user/infrastructure/passport/jwt.guard';
import {SearchGameByIdControllerResponse} from './search-game-by-id.controller.response';
import {SearchGameByIdControllerRequest} from './search-game-by-id.controller.request';
import {GameDto} from '../../../../../contexts/game/domain/game.dto';
import {SearchGameByIdQuery} from '../../../../../contexts/game/application/search/by-id/search-game-by-id.query';

@Controller(GameConfigConstants.CONTROLLER_PREFIX)
@ApiTags(GameConfigConstants.API_TAG)
@ApiBearerAuth()
export class SearchGameByIdController extends AppController {

    @Get(GameConfigConstants.SEARCH_GAME_BY_ID)
    @UseGuards(JwtGuard)
    @ApiAcceptedResponse({type: SearchGameByIdControllerResponse})
    async controller(@Query() query: SearchGameByIdControllerRequest): Promise<SearchGameByIdControllerResponse> {
        const response: SearchGameByIdControllerResponse = new SearchGameByIdControllerResponse();
        response.data = await this.query<GameDto, SearchGameByIdQuery>(new SearchGameByIdQuery(query.gameId));
        return response;
    }
}