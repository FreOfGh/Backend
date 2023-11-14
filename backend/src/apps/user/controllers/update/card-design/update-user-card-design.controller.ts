import {AppController} from '../../../../shared/controllers/app.controller';
import {Body, Controller, Patch, UseGuards} from '@nestjs/common';
import {UserConfigConstants} from '../../../config/user.config.constants';
import {ApiAcceptedResponse, ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {GameConfigConstants} from '../../../../game/config/game.config.constants';
import {JwtGuard} from '../../../../../contexts/user/infrastructure/passport/jwt.guard';
import {UpdateUserCardDesignControllerResponse} from './update-user-card-design.controller.response';
import {UpdateUserCardDesignControllerRequest} from './update-user-card-design.controller.request';
import {IUserDecorator, User} from '../../../../../contexts/user/domain/user.decorator';
import {
    UpdateUserCardDesignCommand
} from '../../../../../contexts/user/application/update/card-design/update-user-card-design.command';
import {UserDto} from '../../../../../contexts/user/domain/user.dto';

@Controller(UserConfigConstants.CONTROLLER_PREFIX)
@ApiTags(UserConfigConstants.API_TAG)
@ApiBearerAuth()
export class UpdateUserCardDesignController extends AppController {

    @Patch(GameConfigConstants.UPDATE_CARD_DESIGN)
    @UseGuards(JwtGuard)
    @ApiAcceptedResponse({type: UpdateUserCardDesignControllerResponse})
    async controller(
        @Body() body: UpdateUserCardDesignControllerRequest,
        @User() user: IUserDecorator,
    ): Promise<UpdateUserCardDesignControllerResponse> {
        const response: UpdateUserCardDesignControllerResponse = new UpdateUserCardDesignControllerResponse();
        response.data = await this.dispatch<UserDto, UpdateUserCardDesignCommand>(new UpdateUserCardDesignCommand(
            user.userId,
            body.cardDesignId,
        ));
        return response;
    }
}