import {AppController} from '../../../shared/controllers/app.controller';
import {Body, Controller, Patch, UseGuards} from '@nestjs/common';
import {GameConfigConstants} from '../../config/game.config.constants';
import {ApiAcceptedResponse, ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtGuard} from '../../../../contexts/user/infrastructure/passport/jwt.guard';
import {DefaultResponse} from '../../../../contexts/shared/domain/default.response';
import {LeaveGameControllerRequest} from './leave-game.controller.request';
import {IUserDecorator, User} from '../../../../contexts/user/domain/user.decorator';
import {LeaveGameCommand} from '../../../../contexts/game/application/leave/leave-game.command';

@Controller(GameConfigConstants.CONTROLLER_PREFIX)
@ApiTags(GameConfigConstants.API_TAG)
@ApiBearerAuth()
export class LeaveGameController extends AppController {

    @Patch(GameConfigConstants.LEAVE_GAME)
    @UseGuards(JwtGuard)
    @ApiAcceptedResponse({type: DefaultResponse})
    async controller(
        @Body() body: LeaveGameControllerRequest,
        @User() user: IUserDecorator,
    ): Promise<DefaultResponse> {
        const response: DefaultResponse = new DefaultResponse();
        await this.dispatch<void, LeaveGameCommand>(new LeaveGameCommand(
            body.gameCode,
            user.userId,
        ));
        return response;
    }
}