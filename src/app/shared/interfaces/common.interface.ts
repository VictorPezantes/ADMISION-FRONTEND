export interface IPagination<T> {
    count: number;
    maxPages: number;
    page: number;
    totalElements: number;
    results: Array<T>;
}

export interface IDialogData<T> {
    suggestedValidation?: boolean;
    suggestedMeta?: any;
    suggestedHour?: Date;
    suggestedHourEnd?: Date;
    type?: string;
    meta: T;
    savedState?: boolean;
}

export interface Estado {
    id: number;
    name: string;
}

export interface Encargado {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
}

export interface Cargo {
    id: number;
    name: string;
}


export interface AbstractChoice {
    id: number;
    name: string;
}
