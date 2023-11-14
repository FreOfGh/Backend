import {AppController} from '../../../../shared/controllers/app.controller';
import {Controller, Get, UseGuards} from '@nestjs/common';
import {GameConfigConstants} from '../../../config/game.config.constants';
import {ApiAcceptedResponse, ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtGuard} from '../../../../../contexts/user/infrastructure/passport/jwt.guard';
import {SearchPublicGamesControllerResponse} from './search-public-games.controller.response';
import {GameDto} from '../../../../../contexts/game/domain/game.dto';
import {SearchPublicGamesQuery} from '../../../../../contexts/game/application/search/public/search-public-games.query';

@Controller(GameConfigConstants.CONTROLLER_PREFIX)
@ApiTags(GameConfigConstants.API_TAG)
@ApiBearerAuth()
export class SearchPublicGamesController extends AppController {

    @Get(GameConfigConstants.SEARCH_PUBLIC_GAMES)
    @UseGuards(JwtGuard)
    @ApiAcceptedResponse({type: SearchPublicGamesControllerResponse})
    async controller(): Promise<SearchPublicGamesControllerResponse> {
        const response: SearchPublicGamesControllerResponse = new SearchPublicGamesControllerResponse();
        response.data = await this.query<Array<GameDto>, SearchPublicGamesQuery>(new SearchPublicGamesQuery());
        return response;
    }
}