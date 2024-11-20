import { Button, Form, Input, Modal, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import { Profile } from '../../types/profile';

type EditProfileModalProps = {
  open: boolean; // Controls whether the modal is open
  onCancel?: () => void; // Callback function for the cancel action
  onSubmit: (profile: { name: string; email: string; phone: string }) => void; // Callback function for the submit action
  currentProfile: Profile; // Current profile data to pre-fill the form
};

function EditProfileModal({ open, onCancel, onSubmit, currentProfile }: EditProfileModalProps): JSX.Element {
  const [form] = Form.useForm(); // Ant Design form instance
  const [isFormValid, setFormValid] = useState(false); // State to track form validity

  // Handles the cancel button action
  const handleCancel = useCallback(() => {
    onCancel?.(); // Call the parent-provided cancel callback if exists
    form.resetFields(); // Reset form fields for the next open
  }, [form, onCancel]);

  // Handles the submit button action
  const handleSubmit = useCallback(async () => {
    try {
      // Validate form fields
      const values = await form.validateFields();
      onSubmit(values); // Pass the form values to the parent-provided submit callback
      form.resetFields(); // Reset form fields after successful submission
    } catch (errorInfo) {
      message.error('Please make sure all fields are correct'); // Display error message if form validation fails
    }
  }, [form, onSubmit]);

  // Tracks form validity whenever values change
  const handleFormChange = useCallback(async () => {
    try {
      await form.validateFields(); // Validate fields
      setFormValid(true); // Form is valid
    } catch {
      setFormValid(false); // Form is invalid
    }
  }, [form]);

  useEffect(() => {
    // set the initial form validity when the modal is opened
    if (open) {
      handleFormChange();
    }
  }, [handleFormChange, open]);

  return (
    <Modal
      title="Edit Profile" // Modal title
      open={open} // Controlled visibility
      onCancel={handleCancel} // Cancel button action
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit} disabled={!isFormValid}>
          Submit
        </Button>,
      ]}>
      <Form form={form} layout="vertical" initialValues={currentProfile} onValuesChange={handleFormChange}>
        {/* Name field */}
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter your name' }]} // Required validation
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        {/* Email field */}
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' }, // Required validation
            { type: 'email', message: 'Please enter a valid email' }, // Email format validation
          ]}>
          <Input placeholder="Enter your email" />
        </Form.Item>

        {/* Phone field */}
        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: 'Please enter your phone number' }]} // Required validation
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

EditProfileModal.defaultProps = {
  onCancel: () => {}, // Default cancel action does nothing
};

export default EditProfileModal;
