import {AppController} from '../../../../../shared/controllers/app.controller';
import {Controller, Get, UseGuards} from '@nestjs/common';
import {MatchConfigConstants} from '../../../../config/match.config.constants';
import {ApiAcceptedResponse, ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtGuard} from '../../../../../../contexts/user/infrastructure/passport/jwt.guard';
import {SearchActiveMatchByUserControllerResponse} from './search-active-match-by-user.controller.response';
import {IUserDecorator, User} from '../../../../../../contexts/user/domain/user.decorator';
import {MatchDto} from '../../../../../../contexts/match/domain/match.dto';
import {
    SearchActiveMatchByUserQuery
} from '../../../../../../contexts/match/application/search/active/by-user/search-active-match-by-user.query';

@Controller(MatchConfigConstants.CONTROLLER_PREFIX)
@ApiTags(MatchConfigConstants.API_TAG)
@ApiBearerAuth()
export class SearchActiveMatchByUserController extends AppController {

    @Get(MatchConfigConstants.GET_ACTIVE_MATCH)
    @UseGuards(JwtGuard)
    @ApiAcceptedResponse({type: SearchActiveMatchByUserControllerResponse})
    async controller(
        @User() user: IUserDecorator,
    ): Promise<SearchActiveMatchByUserControllerResponse> {
        const response: SearchActiveMatchByUserControllerResponse = new SearchActiveMatchByUserControllerResponse();
        response.data = await this.query<MatchDto, SearchActiveMatchByUserQuery>(new SearchActiveMatchByUserQuery(user.userId));
        return response;
    }
}