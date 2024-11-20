import { Button, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import EditProfileModal from '../components/edit-profile-modal/edit-profile-modal';
import { Profile as ProfileComp } from '../components/profile/profile';
import { getProfile, updateProfile } from '../libs/api';
import { Profile } from '../types/profile';
import './home.css';

function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const profileData = await getProfile();
      setProfile(profileData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      }
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchData().finally(() => setIsLoading(false));
  }, [fetchData]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleEditSubmit = useCallback(
    async (newProfile: Profile) => {
      try {
        const updatedProfile = await updateProfile(newProfile);
        // optimistic update
        setProfile(updatedProfile);
        message.success('Profile updated successfully');
        setIsEditing(false);
        // fetch updated data
        fetchData();
      } catch (err: unknown) {
        if (err instanceof Error) {
          message.error(err.message);
        }
      }
    },
    [fetchData],
  );

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!profile && !isLoading && !error && <p>No profile data</p>}
      {profile && (
        <>
          <ProfileComp profile={profile} />
          <Button type="primary" onClick={handleEdit}>
            Edit your profile
          </Button>
          <EditProfileModal
            open={isEditing}
            onSubmit={handleEditSubmit}
            onCancel={handleEditCancel}
            currentProfile={profile}
          />
        </>
      )}
    </>
  );
}

export default Home;
