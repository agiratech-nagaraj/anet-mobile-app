
export interface User {
    id: number;
    name: string;
}

export interface Project {
    id: number;
    name: string;
}

export interface Activity {
    id: number;
    name: string;
}

export interface Mentor {
    id: number;
    name: string;
}

export interface Timesheet {
    id: number;
    date: string;
    user: User;
    comment: string;
    project: Project;
    activity: Activity;
    worked_hours: number;
    billed_hours: number;
    mentor: Mentor;
}

export interface Result {
    count: number;
    timesheets: Timesheet[];
    worked_hours: number;
    billed_hours: number;
}

export interface TimesheetsResponse {
    success: boolean;
    result: Result;
    errors: any;
}
