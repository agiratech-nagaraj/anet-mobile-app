export interface WorkFromHome {
  id: number;
  permission_type: string;
  date: string;
  from_time: string;
  to_time: string;
  cc_emails: any[];
  reason: string;
  withdraw: boolean;
  status: string;
  account_id: number;
  emp_id: string;
  account_name: string;
  editable: boolean;
  approved_by?: any;
  project_id: number;
  project_name: string;
  billable: boolean;
  created_at: Date;
}

export interface Result {
  count: number;
  work_from_homes: WorkFromHome[];
}

export interface WFHListResponse {
  success: boolean;
  result: Result;
  errors: any;
}


