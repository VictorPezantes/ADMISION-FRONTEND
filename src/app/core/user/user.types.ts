export interface User
{
    id?: string;
    name?: string;
    nombre?: string;
    email?: string;
    username?: string;
    role?: any;
    rol?: any;
    avatar?: string;
    fotografia?: string;
    status?: string;
    roles?: any;
    authorities?: {
        authority: string
    }[];
}
