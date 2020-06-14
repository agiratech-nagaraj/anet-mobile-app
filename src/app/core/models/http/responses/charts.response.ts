
export interface Project {
  total_hours: number;
  billed_hours: number;
  worked_hours: number;
}

export interface Projects {
  [key: string]: Project;
}

export interface BarData {
  name: string;
  data: number[];
}

export interface StackedBarData {
  name: string;
  data: number[];
  stack: string;
}

export interface Result {
  duration: string[];
  total_hours: number;
  billed_hours: number;
  worked_hours: number;
  projects: Projects;
  bar_data: BarData[];
  stacked_bar_data: StackedBarData[];
}

export interface ChartsResponse {
  success: boolean;
  result: Result;
}
