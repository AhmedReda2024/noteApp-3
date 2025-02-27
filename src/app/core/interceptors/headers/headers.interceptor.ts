import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  // logic req
  // token

  if (localStorage.getItem('userToken') !== null) {
    // ya3ni feh tokin already
    if (req.url.includes('notes')) {
      req = req.clone({
        setHeaders: {
          token: `3b8ny__${localStorage.getItem('userToken')!}`,
        },
      });
    }
  }

  return next(req); // logic res
};
