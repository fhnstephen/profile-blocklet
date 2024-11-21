import { useCallback, useEffect, useState } from 'react';

import { getProfile, updateProfile } from '../libs/api';
import { type Profile } from '../types/profile';

type UseProfileResult = {
  data: Profile | null;
  isLoading: boolean;
  error: Error | null;
  fetchData: () => Promise<Profile | null>;
  updateProfile: (newProfile: Profile) => Promise<Profile | null>;
};

/**
 * Custom hook to fetch and update profile data with loading and error handling
 * Behaviors:
 * - Fetch profile data on mount
 * - Update profile data
 * - Handle loading and error states
 * - Fetch data again after update
 * - Optimistic update after update
 * - if error occurs in fetch or update, error state will be set, and error will be thrown
 * @returns {UseProfileResult}
 * @example
 * const { data, isLoading, error, fetchData, update } = useProfile();
 * if (isLoading) return <Spin />;
 * if (error) return <p>Error: {error.message}</p>;
 * if (!data) return <p>No profile data</p>;
 * return (
 *  <Profile profile={data} />
 * );
 */
export default function useProfile(): UseProfileResult {
  const [data, setData] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const profileData = await getProfile();
      setData(profileData);
      // clear error
      setError(null);
      return profileData;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      }
      throw err;
    }
  }, []);

  const update = useCallback(
    async (newProfile: Profile) => {
      try {
        const updatedProfile = await updateProfile(newProfile);
        // optimistic update
        setData(updatedProfile);
        // fetch updated data
        fetchData();
        return updatedProfile;
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        }
        throw err;
      }
    },
    [fetchData],
  );

  useEffect(() => {
    setIsLoading(true);
    fetchData().finally(() => setIsLoading(false));
  }, [fetchData]);

  return { data, isLoading, error, fetchData, updateProfile: update };
}