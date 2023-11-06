import {SchemaDefinitionProperty} from 'mongoose';
import {DocumentBase} from './document-base';

export type SchemaDefinitionType<T> = Omit<Required<{
    [K in keyof DocumentBase<T>]: SchemaDefinitionProperty<DocumentBase<T>[K]>;
}>, keyof { createdAt, updatedAt }>;
