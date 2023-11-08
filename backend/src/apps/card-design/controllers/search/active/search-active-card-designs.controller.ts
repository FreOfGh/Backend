import {AppController} from '../../../../shared/controllers/app.controller';
import {Controller, Get, UseGuards} from '@nestjs/common';
import {CardDesignConfigConstants} from '../../../config/card-design-config.constants';
import {ApiAcceptedResponse, ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtGuard} from '../../../../../contexts/user/infrastructure/passport/jwt.guard';
import {SearchActiveCardDesignsControllerResponse} from './search-active-card-designs.controller.response';
import {
    SearchActiveCardDesignsQuery
} from '../../../../../contexts/card-design/application/search/active/search-active-card-designs.query';
import {CardDesignDto} from '../../../../../contexts/card-design/domain/card-design.dto';

@Controller(CardDesignConfigConstants.CONTROLLER_PREFIX)
@ApiTags(CardDesignConfigConstants.API_TAG)
@ApiBearerAuth()
export class SearchActiveCardDesignsController extends AppController {

    @Get(CardDesignConfigConstants.SEARCH_ACTIVE_DESIGNS)
    @UseGuards(JwtGuard)
    @ApiAcceptedResponse({type: SearchActiveCardDesignsControllerResponse})
    async controller(): Promise<SearchActiveCardDesignsControllerResponse> {
        const response: SearchActiveCardDesignsControllerResponse = new SearchActiveCardDesignsControllerResponse();
        response.data = await this.query<Array<CardDesignDto>, SearchActiveCardDesignsQuery>(new SearchActiveCardDesignsQuery());
        return response;
    }
}