import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {BuildAccessInfoAppResponse} from './build-access-info.app.response';
import {BuildAccessInfoCommand} from './build-access-info.command';
import {BuildAccessInfoApp} from './build-access-info.app';

@CommandHandler(BuildAccessInfoCommand)
export class BuildAccessInfoCommandHandler implements ICommandHandler<BuildAccessInfoCommand, BuildAccessInfoAppResponse> {

    constructor(private readonly app: BuildAccessInfoApp) {
    }

    execute(command: BuildAccessInfoCommand): Promise<BuildAccessInfoAppResponse> {
        return this.app.exec(command.user);
    }
}