import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {UpdateUserCardDesignCommand} from './update-user-card-design.command';
import {UserDto} from '../../../domain/user.dto';
import {Logger} from '@nestjs/common';
import {UpdateUserCardDesignApp} from './update-user-card-design.app';
import {User} from '../../../domain/user';
import {UserId} from '../../../domain/user-id';
import {CardDesignId} from '../../../../card-design/domain/card-design-id';

@CommandHandler(UpdateUserCardDesignCommand)
export class UpdateUserCardDesignCommandHandler implements ICommandHandler<UpdateUserCardDesignCommand, UserDto> {

    private readonly logger: Logger = new Logger(UpdateUserCardDesignCommandHandler.name);

    constructor(private readonly app: UpdateUserCardDesignApp) {
    }

    async execute(command: UpdateUserCardDesignCommand): Promise<UserDto> {
        this.logger.log(`[${this.execute.name}] INIT :: command: ${JSON.stringify(command)}`);
        const updated: User = await this.app.exec(
            new UserId(command.userId),
            new CardDesignId(command.cardDesignId),
        );
        const response: UserDto = updated.toPrimitives();
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return response;
    }
}