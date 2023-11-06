import {Injectable, Logger} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';

@Injectable()
export abstract class AppController {

    protected abstract readonly logger: Logger;

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {
    }

    protected async dispatch<T, C>(command: C): Promise<T> {
        return this.commandBus.execute(command);
    }

    protected async query<T, C>(query: C): Promise<T> {
        return this.queryBus.execute(query);
    }
}