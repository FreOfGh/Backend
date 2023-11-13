import {Match} from './match';

export interface IMatchRepository {

    create(match: Match): Promise<Match>;
}