import {AppController} from '../../../../shared/controllers/app.controller';
import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {PlayerConfigConstants} from '../../../config/player.config.constants';
import {ApiAcceptedResponse, ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtGuard} from '../../../../../contexts/user/infrastructure/passport/jwt.guard';
import {SearchPlayersByGameControllerResponse} from './search-players-by-game.controller.response';
import {SearchPlayersByGameControllerRequest} from './search-players-by-game.controller.request';
import {PlayerDto} from '../../../../../contexts/player/domain/player.dto';
import {
    SearchPlayersByGameQuery
} from '../../../../../contexts/player/application/search/by-game/search-players-by-game.query';

@Controller(PlayerConfigConstants.CONTROLLER_PREFIX)
@ApiTags(PlayerConfigConstants.API_TAG)
@ApiBearerAuth()
export class SearchPlayersByGameController extends AppController {

    @Get(PlayerConfigConstants.SEARCH_PLAYERS_BY_GAME)
    @UseGuards(JwtGuard)
    @ApiAcceptedResponse({type: SearchPlayersByGameControllerResponse})
    async controller(
        @Query() body: SearchPlayersByGameControllerRequest,
    ): Promise<SearchPlayersByGameControllerResponse> {
        const response: SearchPlayersByGameControllerResponse = new SearchPlayersByGameControllerResponse();
        response.data = await this.query<Array<PlayerDto>, SearchPlayersByGameQuery>(new SearchPlayersByGameQuery(
            body.gameId,
        ));
        return response;
    }
}