import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../service/token.service";

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  if (tokenService.haveToken()) {
    return true
  } else {
    await router.navigate(['/home'])
    return false
  }
};
