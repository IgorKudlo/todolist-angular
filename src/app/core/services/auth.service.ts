import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonResponse } from '../models/core.models';
import { ResultCodeEnum } from '../enums/resultCode.enum';
import { Router } from '@angular/router';
import { LoginRequestData, MeResponse } from '../models/auth.models';
import { catchError, EMPTY } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable()
export class AuthService {
  isAuth = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService,
  ) {}

  login(data: Partial<LoginRequestData>) {
    this.http
      .post<CommonResponse<{ userId: number }>>(`${environment.baseURL}/auth/login`, data)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((res) => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/']);
        } else {
          this.notificationService.handleError(res.message[0]);
        }
      });
  }

  logout() {
    this.http
      .delete<CommonResponse>(`${environment.baseURL}/auth/login`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((res) => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/login']);
        }
      });
  }

  me() {
    this.http
      .get<CommonResponse<MeResponse>>(`${environment.baseURL}/auth/me`)
      .pipe(catchError(this.errorHandler.bind(this)))

      .subscribe((res) => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.isAuth = true;
        }
      });
  }

  private errorHandler(err: HttpErrorResponse) {
    this.notificationService.handleError(err.message);
    return EMPTY;
  }
}
