import {DocumentBase} from '../../../shared/infrastructure/mongodb/document-base';
import {UserDto} from '../../domain/user.dto';
import {Document, Schema} from 'mongoose';
import {SchemaDefinitionType} from '../../../shared/infrastructure/mongodb/schema-definition-type';

export type UserDocument = User & Document;
type User = DocumentBase<UserDto>;

const definition: SchemaDefinitionType<User> = {
    cardType: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        index: true
    },
    tokens: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        index: true,
    },
};
export const UserSchema = new Schema(definition as Record<string, unknown>, {timestamps: true});