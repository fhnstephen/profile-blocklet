import { Button, Spin, Typography, message } from 'antd';
import { useCallback, useState } from 'react';

import EditProfileModal from '../components/edit-profile-modal/edit-profile-modal';
import { Profile as ProfileComp } from '../components/profile/profile';
import useProfile from '../hooks/use-profile';
import { Profile } from '../types/profile';
import './home.css';

function Home() {
  const { data: profile, isLoading, error, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleEditSubmit = useCallback(
    async (newProfile: Profile) => {
      try {
        await updateProfile(newProfile);
        message.success('Profile updated successfully');
        setIsEditing(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          message.error(err.message);
        }
      }
    },
    [updateProfile],
  );

  if (isLoading) {
    return <Spin />;
  }

  if (error && !profile) {
    // If there is an error and no profile data, show the error message
    return <p>Error: {error.message}, please refresh the page to try again or contact the Administrator.</p>;
  }

  if (!profile) {
    return <p>No profile data</p>;
  }

  // profile is ready, render profile and edit button

  return (
    <>
      <Typography.Title level={2}>Hello, {profile.name}</Typography.Title>
      <ProfileComp profile={profile} />
      <Button type="primary" onClick={handleEdit} style={{ marginTop: 16 }}>
        Edit your profile
      </Button>
      <EditProfileModal
        open={isEditing}
        onSubmit={handleEditSubmit}
        onCancel={handleEditCancel}
        currentProfile={profile}
      />
    </>
  );
}

export default Home;
