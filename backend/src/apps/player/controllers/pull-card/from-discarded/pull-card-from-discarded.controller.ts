import {AppController} from '../../../../shared/controllers/app.controller';
import {Controller, Patch, UseGuards} from '@nestjs/common';
import {PlayerConfigConstants} from '../../../config/player.config.constants';
import {ApiAcceptedResponse, ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtGuard} from '../../../../../contexts/user/infrastructure/passport/jwt.guard';
import {PullCardControllerResponse} from '../pull-card.controller.response';
import {IUserDecorator, User} from '../../../../../contexts/user/domain/user.decorator';
import {PullCardAppResponse} from '../../../../../contexts/player/application/pull-card/pull-card.app.response';
import {
    PullCardFromDiscardedCommand
} from '../../../../../contexts/player/application/pull-card/from-discarded/pull-card-from-discarded.command';

@Controller(PlayerConfigConstants.CONTROLLER_PREFIX)
@ApiTags(PlayerConfigConstants.API_TAG)
@ApiBearerAuth()
export class PullCardFromDiscardedController extends AppController {

    @Patch(PlayerConfigConstants.PULL_CARD_FROM_DISCARDED)
    @UseGuards(JwtGuard)
    @ApiAcceptedResponse({type: PullCardControllerResponse})
    async controller(
        @User() user: IUserDecorator
    ): Promise<PullCardControllerResponse> {
        const response: PullCardControllerResponse = new PullCardControllerResponse();
        response.data = await this.dispatch<PullCardAppResponse, PullCardFromDiscardedCommand>(new PullCardFromDiscardedCommand(
            user.userId,
        ));
        return response;
    }
}