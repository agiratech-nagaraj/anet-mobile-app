export interface Result {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface ActivitiesListResponse {
    success: boolean;
    result: Result[];
}
