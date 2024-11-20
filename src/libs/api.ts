import { createAxios } from '@blocklet/js-sdk';

import { Profile } from '../types/profile';

const api = createAxios({
  baseURL: window?.blocklet?.prefix || '/',
});

export async function getProfile(): Promise<Profile> {
  const { data } = await api.get('/api/profile');
  return data;
}

export default api;
