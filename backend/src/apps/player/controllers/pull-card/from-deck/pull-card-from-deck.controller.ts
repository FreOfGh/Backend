import {AppController} from '../../../../shared/controllers/app.controller';
import {Controller, Patch, UseGuards} from '@nestjs/common';
import {PlayerConfigConstants} from '../../../config/player-config.constants';
import {ApiAcceptedResponse, ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtGuard} from '../../../../../contexts/user/infrastructure/passport/jwt.guard';
import {PullCardFromDeckControllerResponse} from './pull-card-from-deck.controller.response';
import {
    PullCardFromDeckCommand
} from '../../../../../contexts/player/application/pull-card/from-deck/pull-card-from-deck.command';
import {PlayerDto} from '../../../../../contexts/player/domain/player.dto';
import {IUserDecorator, User} from '../../../../../contexts/user/domain/user.decorator';

@Controller(PlayerConfigConstants.CONTROLLER_PREFIX)
@ApiTags(PlayerConfigConstants.API_TAG)
@ApiBearerAuth()
export class PullCardFromDeckController extends AppController {

    @Patch(PlayerConfigConstants.PULL_CARD_FROM_DECK)
    @UseGuards(JwtGuard)
    @ApiAcceptedResponse({type: PullCardFromDeckControllerResponse})
    async controller(
        @User() user: IUserDecorator,
    ): Promise<PullCardFromDeckControllerResponse> {
        const response: PullCardFromDeckControllerResponse = new PullCardFromDeckControllerResponse();
        response.data = await this.dispatch<PlayerDto, PullCardFromDeckCommand>(new PullCardFromDeckCommand(user.userId));
        return response;
    }
}