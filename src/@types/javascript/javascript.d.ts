declare interface String {
    replaceAt: (index: number, replace: string) => string;
    getNumberValue: () => number;
}

declare interface Date {
    isValid: () => {};
}

declare interface Array<T> {
    mapAsync<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Promise<any>;
}