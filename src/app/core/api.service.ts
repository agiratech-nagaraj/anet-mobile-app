import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';


import {SignInPayload} from './models/http/payloads/sign-in.payload';
import {SignOutResponse} from './models/http/responses/sign-out.response';
import {ActivitiesListResponse} from './models/http/responses/activities-list.response';
import {ProjectsListResponse} from './models/http/responses/projects-list.response';
import {TimesheetPayload} from './models/http/payloads/timesheet.payload';
import {TimesheetsResponse} from './models/http/responses/timesheets.response';
import {WorkFromHome} from './models/http/payloads/wfh.payload';
import {WFHResponse} from './models/http/responses/wfh.response';
import {WFHListResponse} from './models/http/responses/wfh-list.response';
import {StorageKeys, StorageService} from '../storage';
import {SignInResponse} from './models/http/responses/sign-in.response';
import {AlertService} from './alert.service';
import {TimesheetResponse} from './models/http/responses/timesheet.response';
import {WfhRecordResponse} from './models/http/responses/wfh-record.response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {
  }

  private errorHandler(operationName: string, defaultData): (e) => Observable<any> {
    return (error: HttpErrorResponse) => {
      const errorMessage = (error.error instanceof ErrorEvent) ?
        error.error.message : `server returned code ${error.status} with body "${JSON.stringify(error.error)}"`;

      this.alertService.toastAlert(errorMessage, operationName);
      return of({errors: errorMessage, data: defaultData});
    };
  }

  signIn(paylaod: SignInPayload) {
    return this.http.post('anet-api/accounts/sign_in', paylaod, {observe: 'response'}).pipe(
      catchError(err => of(err))
    );
  }

  signOut(): Observable<SignOutResponse> {
    return this.http.delete<SignOutResponse>('anet-api/accounts/sign_out')
      .pipe(catchError(this.errorHandler('Sign out', null)));
  }

  getActivitiesList(): Observable<ActivitiesListResponse> {
    return this.http.get<ActivitiesListResponse>('anet-api/activities')
      .pipe(catchError(this.errorHandler('Getting Activities List', null)));
  }

  getProjectsList(): Observable<ProjectsListResponse> {
    return this.http.get<ProjectsListResponse>('anet-api/projects')
      .pipe(catchError(this.errorHandler('Getting Project List', null)));
  }

  addTimeSheet(payload: TimesheetPayload): Observable<TimesheetsResponse> {
    const user: SignInResponse = StorageService.instance.getItem(StorageKeys.userData, true);
    const userId = user?.data?.id;
    payload = {...payload, account_id: userId.toString()};
    return this.http.post('anet-api/timesheets', payload)
      .pipe(catchError(this.errorHandler('Adding Time Sheet', null)));
  }

  getTimeSheets(pageNo = 1, duration = 'this month'): Observable<TimesheetsResponse> {
    const user: SignInResponse = StorageService.instance.getItem(StorageKeys.userData, true);
    const userId = user?.data?.id;
    const url = `anet-api/timesheets/?page_no=${pageNo}&duration=${duration}&user_id=${userId}`;
    return this.http.get(url)
      .pipe(catchError(this.errorHandler('Getting Time Sheet', null)));
  }

  addWFH(payload: WorkFromHome): Observable<WFHResponse> {
    const url = `anet-api/work_from_homes`;
    const user: SignInResponse = StorageService.instance.getItem(StorageKeys.userData, true);
    const userId = user?.data?.id as number;
    // tslint:disable-next-line:variable-name
    const work_from_home = {...payload, account_id: userId, permission_type: 'work_from_home'};
    return this.http.post<WFHResponse>(url, {work_from_home})
      .pipe(catchError(this.errorHandler('Add WFH', null)));
  }

  getWFHList(pageNo = 1, thisMonth = true, lastMonth = false): Observable<WFHListResponse> {
    let url = `anet-api/work_from_homes?self=true&filter=true&page_no=${pageNo}`;
    if (thisMonth) {
      url = `${url}&this_month=${thisMonth}`;
    }
    if (lastMonth) {
      url = `${url}&last_month=${lastMonth}`;
    }
    return this.http.get<WFHListResponse>(url)
      .pipe(catchError(this.errorHandler('WFH List', null)));
  }

  getAppliedWFH(id: number): Observable<WfhRecordResponse> {
    const url = `anet-api/work_from_homes/${id}`;
    return this.http.get<WfhRecordResponse>(url)
      .pipe(catchError(this.errorHandler('get Applied WFH', null)));
  }

  updateAppliedWFH(id: number, payload: WorkFromHome) {

    const url = `anet-api/work_from_homes/${id}`;
    const user: SignInResponse = StorageService.instance.getItem(StorageKeys.userData, true);
    const userId = user?.data?.id as number;
    // tslint:disable-next-line:variable-name
    const work_from_home = {...payload, account_id: userId, permission_type: 'work_from_home'};
    return this.http.put(url, {work_from_home})
      .pipe(catchError(this.errorHandler('Update Applied WFH', null)));

  }

  deleteAppliedWFH(id: number) {
    const url = `anet-api/work_from_homes/${id}`;
    return this.http.delete(url)
      .pipe(catchError(this.errorHandler('Delete Applied WFH', null)));
  }

  getTimeSheet(id: number): Observable<TimesheetResponse> {
    const url = `anet-api/timesheets/${id}`;
    return this.http.get<TimesheetResponse>(url)
      .pipe(catchError(this.errorHandler('Get Timesheet', null)));
  }

  updateTimeSheet(id: number, payload: TimesheetPayload) {
    const url = `anet-api/timesheets/${id}`;
    const user: SignInResponse = StorageService.instance.getItem(StorageKeys.userData, true);
    const userId = user?.data?.id;
    payload = {...payload, account_id: userId.toString()};
    return this.http.put(url, payload)
      .pipe(catchError(this.errorHandler('Update Timesheet', null)));
  }

  deleteTimeSheet(id: number) {
    const url = `anet-api/timesheets/${id}`;
    return this.http.delete(url)
      .pipe(catchError(this.errorHandler('Delete Timesheet', null)));
  }

}
