import {SearchPlayerByUserApp} from '../../../../../player/application/search/by-user/search-player-by-user.app';
import {SearchActiveMatchApp} from '../search-active-match.app';
import {Match} from '../../../../domain/match';
import {UserId} from '../../../../../user/domain/user-id';
import {Player} from '../../../../../player/domain/player';

export class SearchActiveMatchByUserApp {

    constructor(
        private readonly searchPlayerByUserApp: SearchPlayerByUserApp,
        private readonly searchActiveMatchApp: SearchActiveMatchApp,
    ) {
    }

    async exec(userId: UserId): Promise<Match> {
        const player: Player = await this.searchPlayerByUserApp.exec(userId);
        return this.searchActiveMatchApp.exec(player.gameId);
    }
}