import {AppController} from '../../../shared/controllers/app.controller';
import {Body, Controller, Patch, UseGuards} from '@nestjs/common';
import {GameConfigConstants} from '../../config/game-config.constants';
import {ApiAcceptedResponse, ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtGuard} from '../../../../contexts/user/infrastructure/passport/jwt.guard';
import {JoinGameControllerResponse} from './join-game.controller.response';
import {JoinGameControllerRequest} from './join-game.controller.request';
import {IUserDecorator, User} from '../../../../contexts/user/domain/user.decorator';
import {GameDto} from '../../../../contexts/game/domain/game.dto';
import {JoinGameCommand} from '../../../../contexts/game/application/join/join-game.command';

@Controller(GameConfigConstants.CONTROLLER_PREFIX)
@ApiTags(GameConfigConstants.API_TAG)
@ApiBearerAuth()
export class JoinGameController extends AppController {

    @Patch(GameConfigConstants.JOIN_GAME)
    @UseGuards(JwtGuard)
    @ApiAcceptedResponse({type: JoinGameControllerResponse})
    async controller(
        @Body() body: JoinGameControllerRequest,
        @User() user: IUserDecorator,
    ): Promise<JoinGameControllerResponse> {
        const response: JoinGameControllerResponse = new JoinGameControllerResponse();
        response.data = await this.dispatch<GameDto, JoinGameCommand>(new JoinGameCommand(
            user.userId,
            body.gameCode,
        ));
        return response;
    }
}