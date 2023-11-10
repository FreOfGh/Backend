import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {SearchUserByIdQuery} from './search-user-by-id.query';
import {UserDto} from '../../../domain/user.dto';
import {SearchUserByIdApp} from './search-user-by-id.app';
import {Logger} from '@nestjs/common';
import {User} from '../../../domain/user';
import {UserId} from '../../../domain/user-id';

@QueryHandler(SearchUserByIdQuery)
export class SearchUserByIdQueryHandler implements IQueryHandler<SearchUserByIdQuery, UserDto> {

    private readonly logger: Logger = new Logger(SearchUserByIdQueryHandler.name);

    constructor(private readonly app: SearchUserByIdApp) {
    }

    async execute(query: SearchUserByIdQuery): Promise<UserDto> {
        this.logger.log(`[${this.execute.name}] INIT :: query: ${JSON.stringify(query)}`);
        const user: User = await this.app.exec(new UserId(query.userId));
        const response: UserDto = user.toPrimitives();
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return response;
    }
}