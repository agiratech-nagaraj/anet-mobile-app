import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import swal from 'sweetalert2';
import {catchError} from 'rxjs/operators';


import {SignInPayload} from './models/http/payloads/sign-in.payload';
import {SignOutResponse} from './models/http/responses/sign-out.response';
import {ActivitiesListResponse} from './models/http/responses/activities-list.response';
import {ProjectsListResponse} from './models/http/responses/projects-list.response';
import {TimesheetPayload} from './models/http/payloads/timesheet.payload';
import {TimesheetResponse} from './models/http/responses/timesheet.response';
import { WorkFromHome} from './models/http/payloads/wfh.payload';
import {WFHResponse} from './models/http/responses/wfh.response';
import {WFHListResponse} from './models/http/responses/wfh-list.response';
import {StorageKeys, StorageService} from '../storage';
import {SignInResponse} from './models/http/responses/sign-in.response';
import {AlertService} from './alert.service';

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

      this.alertService.toastAlert(errorMessage);
      return of({errors: errorMessage, data: defaultData});
    };
  }

  signIn(paylaod: SignInPayload) {
    return this.http.post('anet-api/accounts/sign_in', paylaod, {observe: 'response' as 'body'});
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

  addTimeSheet(payload: TimesheetPayload): Observable<TimesheetResponse> {
    return this.http.post('anet-api/', payload)
      .pipe(catchError(this.errorHandler('Adding Time Sheet', null)));
  }

  getTimeSheet(pageNo = 1, duration = 'this month'): Observable<TimesheetResponse> {
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
    const work_from_home = {...payload, account_id: userId};
    return this.http.post<WFHResponse>(url, {work_from_home})
      .pipe(catchError(this.errorHandler('Add WFH', null)));
  }

  getWFHList(pageNo = 1, thisMonth = true): Observable<WFHListResponse> {
    const url = `anet-api/work_from_homes?self=true&filter=true&page_no=${pageNo}&this_month=${thisMonth}`;
    return this.http.get<WFHListResponse>(url)
      .pipe(catchError(this.errorHandler('WFH List', null)));
  }

}
