export interface WorkFromHome {
  permission_type: string;
  date: string;
  from_time: string;
  to_time: string;
  project_id: string;
  billable: string;
  cc_emails: any[];
  reason: string;
  account_id?: number;
}

export interface WFHPayload {
  work_from_home: WorkFromHome;
}
