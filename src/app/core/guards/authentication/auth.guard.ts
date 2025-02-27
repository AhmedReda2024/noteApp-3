import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const plat_id = inject(PLATFORM_ID);

  if (isPlatformBrowser(plat_id)) {
    if (localStorage.getItem('userToken') !== null) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else {
    return false;
  }
};
