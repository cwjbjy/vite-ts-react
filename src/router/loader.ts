import { redirect } from 'react-router-dom';

import { ls } from '@/utils/storage';

import { ACCESS_TOKEN } from '@/settings/localStorage';
import { LOGIN } from '@/settings/routerMap';

export function protectedLoader() {
  if (!ls.get(ACCESS_TOKEN)) {
    return redirect(LOGIN);
  }
  return null;
}
