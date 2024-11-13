import { Role } from "./role.enum";

export interface UserProfile {
    id: string;
    userName: string;
    role: Role;
}