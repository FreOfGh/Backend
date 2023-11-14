import {AppController} from '../../../shared/controllers/app.controller';
import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {GameConfigConstants} from '../../config/game.config.constants';
import {ApiAcceptedResponse, ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtGuard} from '../../../../contexts/user/infrastructure/passport/jwt.guard';
import {CreateGameControllerResponse} from './create-game.controller.response';
import {GameDto} from '../../../../contexts/game/domain/game.dto';
import {CreateGameCommand} from '../../../../contexts/game/application/create/create-game.command';
import {CreateGameControllerRequest} from './create-game.controller.request';
import {IUserDecorator, User} from '../../../../contexts/user/domain/user.decorator';

@Controller(GameConfigConstants.CONTROLLER_PREFIX)
@ApiTags(GameConfigConstants.API_TAG)
@ApiBearerAuth()
export class CreateGameController extends AppController {

    @Post(GameConfigConstants.CREATE_GAME)
    @UseGuards(JwtGuard)
    @ApiAcceptedResponse({type: CreateGameControllerResponse})
    async controller(
        @Body() body: CreateGameControllerRequest,
        @User() user: IUserDecorator,
    ): Promise<CreateGameControllerResponse> {
        const response: CreateGameControllerResponse = new CreateGameControllerResponse();
        response.data = await this.dispatch<GameDto, CreateGameCommand>(new CreateGameCommand(
            user.userId,
            body.requiredPlayers,
            body.isPublic,
            body.totalBet,
            body.name,
        ));
        return response;
    }
}