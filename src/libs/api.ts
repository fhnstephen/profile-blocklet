import { createAxios } from '@blocklet/js-sdk';

import { Profile } from '../types/profile';

const api = createAxios({
  baseURL: window?.blocklet?.prefix || '/',
});

export async function getProfile(): Promise<Profile> {
  const { data } = await api.get('/v1/api/profile');
  return data;
}

export async function updateProfile(profile: Profile): Promise<Profile> {
  const { data } = await api.patch('/v1/api/profile', profile);
  return data;
}

export async function createProfile(profile: Profile): Promise<Profile> {
  const { data } = await api.post('/v1/api/profile', profile);
  return data;
}

export default api;
