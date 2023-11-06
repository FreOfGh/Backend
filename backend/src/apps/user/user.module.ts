import {Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {UserDocumentProvider} from '../../contexts/user/infrastructure/mongodb/user-document.provider';
import {MongoUserRepositoryProvider} from '../../contexts/user/infrastructure/mongodb/mongo-user.repository.provider';

@Module({
    imports: [SharedModule],
    providers: [
        UserDocumentProvider,
        MongoUserRepositoryProvider,
    ]
})
export class UserModule{
}