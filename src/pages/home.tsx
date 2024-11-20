import { Button } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import EditProfileModal from '../components/edit-profile-modal/edit-profile-modal';
import { Profile as ProfileComp } from '../components/profile/profile';
import { getProfile } from '../libs/api';
import { Profile } from '../types/profile';
import './home.css';

function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

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
          <EditProfileModal open={isEditing} onSubmit={() => {}} onCancel={handleEditCancel} currentProfile={profile} />
        </>
      )}
    </>
  );
}

export default Home;
