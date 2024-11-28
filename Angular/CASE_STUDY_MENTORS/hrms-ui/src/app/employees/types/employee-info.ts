export interface EmployeeInfo {
    id: string;
    name: string;
    email: string;
    departmentId: string;
    designation: string;
    manager: string;
    yearOfJoining: number;
    skills: string;
    address: string;
    phoneNumber: number; 
    status?:boolean;
    password?:string;
    role?:string;
}