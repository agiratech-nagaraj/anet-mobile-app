export interface Manager {
    id: number;
    name: string;
    email: string;
}

export interface Account {
    id: number;
    name: string;
    account_email: string;
}

export interface Department {
    department_id?: number;
    name: string;
}

export interface Account2 {
    id: number;
    name: string;
    emp_id: string;
    email: string;
    joining_date: string;
    department: Department;
}

export interface Project2 {
    id: number;
    name: string;
    owner: string;
    accounts: Account2[];
}

export interface Project {
    id: number;
    account: Account;
    project: Project2;
    is_active: boolean;
}

export interface Department2 {
    department_id: number;
    name: string;
}

export interface Data {
    id: number;
    name: string;
    email: string;
    emp_id: string;
    manager: Manager;
    is_active: boolean;
    is_asset_enabled: boolean;
    is_timesheet_enabled: boolean;
    is_invoice_enabled?: any;
    is_timesheet_manager?: any;
    is_work_from_home_manager: boolean;
    attachment: string;
    roles: string[];
    role_ids: number[];
    projects: Project[];
    is_recruitment_enabled: boolean;
    owner: boolean;
    joining_date: string;
    department: Department2;
}

export interface SignInResponse {
    data: Data;
}
