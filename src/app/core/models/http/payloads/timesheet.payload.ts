export interface TimesheetPayload {
    account_id?: string;
    project_id: string;
    activity_id: string;
    worked_hours: number;
    billed_hours: number;
    comment: string;
    date: string;
}
