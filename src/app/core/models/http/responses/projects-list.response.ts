export interface Owner {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Account2 {
    id: number;
    name: string;
    account_email: string;
}

export interface Department {
    department_id?: number;
    name: string;
}

export interface Account3 {
    id: number;
    name: string;
    emp_id: string;
    email: string;
    joining_date: string;
    department: Department;
}

export interface Project {
    id: number;
    name: string;
    owner: string;
    accounts: Account3[];
}

export interface Account {
    id: number;
    account: Account2;
    project: Project;
    is_active: boolean;
}

export interface Result {
    id: number;
    name: string;
    description: string;
    duration?: any;
    budget?: any;
    is_active: boolean;
    is_default?: boolean;
    client_id: number;
    owner: Owner;
    category: Category;
    client_name: string;
    accounts: Account[];
}

export interface ProjectsListResponse {
    success: boolean;
    result: Result[];
    count: number;
    default_projects: number[];
}
