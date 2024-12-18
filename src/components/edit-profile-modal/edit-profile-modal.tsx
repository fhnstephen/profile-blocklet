import { Button, Modal, message } from 'antd';
import { useCallback, useState } from 'react';

import { Profile } from '../../types/profile';
import ProfileForm from '../profile-form/profile-form';

type EditProfileModalProps = {
  open: boolean; // Controls whether the modal is open
  onCancel?: () => void | Promise<void>; // Callback function for the cancel action
  onSubmit: (newProfile: Profile) => void | Promise<void>; // Callback function for the submit action
  currentProfile: Profile; // Current profile data to pre-fill the form
};

function EditProfileModal({ open, onCancel, onSubmit, currentProfile }: EditProfileModalProps): JSX.Element {
  const [submitting, setSubmitting] = useState(false); // Loading state for the submit button
  // Handles the cancel button action
  const handleCancel = useCallback(async () => {
    await onCancel?.(); // Call the parent-provided cancel callback if exists and wait for it to resolve
  }, [onCancel]);

  // Handles the submit button action
  const handleSubmit = useCallback(
    async (values: Profile) => {
      try {
        setSubmitting(true); // Set the loading state to true to prevent duplicate submissions
        await onSubmit(values); // Pass the form values to the parent-provided submit callback
      } catch (errorInfo) {
        message.error('Please make sure all fields are correct'); // Display error message if form validation fails
      } finally {
        setSubmitting(false); // Reset the loading state after submission
      }
    },
    [onSubmit],
  );

  return (
    <Modal
      title="Edit Profile" // Modal title
      open={open} // Controlled visibility
      onCancel={handleCancel} // Cancel button action
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}>
      <ProfileForm
        initialValues={{ ...currentProfile }}
        onSubmit={handleSubmit}
        submitButtonText="Save Changes"
        submitting={submitting}
      />
    </Modal>
  );
}

EditProfileModal.defaultProps = {
  onCancel: () => {}, // Default cancel action does nothing
};

export default EditProfileModal;
