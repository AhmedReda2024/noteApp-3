import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxSpinnerService = inject(NgxSpinnerService);
  // logic req

  ngxSpinnerService.show();

  return next(req).pipe(
    finalize(() => {
      // res tmam / res msh tmam
      // hide spinner
      ngxSpinnerService.hide();
    })
  ); // logic res
};
