import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {SignInPayload} from './models/http/payloads/sign-in.payload';
import {SignOutResponse} from './models/http/responses/sign-out.response';
import {ActivitiesListResponse} from './models/http/responses/activities-list.response';
import {ProjectsListResponse} from './models/http/responses/projects-list.response';
import {TimesheetPayload} from './models/http/payloads/timesheet.payload';
import swal from 'sweetalert2';
import {catchError} from 'rxjs/operators';
import {TimesheetResponse} from './models/http/responses/timesheet.response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  errorHandler(operationName, defaultData) {
    return (error) => {
      swal(operationName, 'Failed', 'error');
      return of(defaultData);
    };
  }

  signIn(paylaod: SignInPayload) {
    return this.http.post('anet-api/accounts/sign_in', paylaod, {observe: 'response' as 'body'})
      .pipe(catchError(this.errorHandler('Sign in', null)));
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

  addTimeSheet(payload: TimesheetPayload): Observable<TimesheetResponse>{
    return this.http.post( 'anet-api/', payload)
      .pipe(catchError(this.errorHandler('Adding Time Sheet', null)));
  }

  getTimeSheet(pageNo, duration, userId = ''): Observable<TimesheetResponse> {
    const url = `anet-api/timesheets/?page_no=${pageNo}&duration=${duration}&user_id=${userId}`;
    return this.http.get(url)
      .pipe(catchError(this.errorHandler('Getting Time Sheet', null)));
  }

}
