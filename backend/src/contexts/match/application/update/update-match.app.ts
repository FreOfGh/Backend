import {Logger} from '@nestjs/common';
import {Match} from '../../domain/match';
import {IMatchRepository} from '../../domain/i-match.repository';
import {MatchNotUpdateException} from '../../domain/exceptions/match-not-update.exception';

export class UpdateMatchApp {

    private readonly logger: Logger = new Logger(UpdateMatchApp.name);

    constructor(private readonly repository: IMatchRepository) {
    }

    async exec(match: Match, throwExceptionIfCantUpdate = true): Promise<Match> {
        this.logger.log(`[${this.exec.name}] INIT :: match: ${match.matchId.toString()}`);
        const updated: Match = await this.repository.update(match);
        if (throwExceptionIfCantUpdate && !updated) throw new MatchNotUpdateException();
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return match;
    }
}