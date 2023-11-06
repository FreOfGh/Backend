export type DocumentBase<T, P extends keyof unknown = keyof unknown> = Required<
    Omit<T, keyof { _id; __v } & P>
>;
