import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';

type ProfileFormValues = {
  name: string;
  email: string;
  phone: string;
};

type ProfileFormProps = {
  initialValues?: ProfileFormValues; // Optional initial values for pre-filling the form
  onSubmit: (values: ProfileFormValues) => void | Promise<void>; // Callback when the form is submitted
  submitButtonText?: string; // Customizable text for the submit button
  submitting?: boolean; // Loading state for the submit button
  showSubmitButton?: boolean; // Whether to show the submit button
};

function ProfileForm({
  initialValues,
  onSubmit,
  submitButtonText,
  submitting,
  showSubmitButton,
}: ProfileFormProps): JSX.Element {
  const [form] = Form.useForm();
  const [isFormValid, setFormValid] = useState(false); // Track form validity
  const values = Form.useWatch([], form); // Watch all form values

  // Validate the form whenever the values change
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setFormValid(true))
      .catch(() => setFormValid(false));
  }, [form, values]);

  const handleFinish = async (formValues: ProfileFormValues) => {
    await onSubmit(formValues);
    // Reset form after successful submission to clear the fields for the next input
    // wrap in setImmediate to ensure the form is reset after the modal closes
    // otherwise, user will see the form reset before the modal closes in a flicker
    setImmediate(form.resetFields);
  };

  // Set initial form values when they change
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  return (
    <Form form={form} layout="vertical" initialValues={initialValues} onFinish={handleFinish}>
      {/* Name Field */}
      <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your name' }]}>
        <Input placeholder="Enter your name" />
      </Form.Item>

      {/* Email Field */}
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}>
        <Input placeholder="Enter your email" />
      </Form.Item>

      {/* Phone Field */}
      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          { required: true, message: 'Please enter your phone number' },
          { pattern: /^\d{10,11}$/, message: 'Please enter a valid phone number (without "-" or country code)' },
        ]}>
        <Input placeholder="Enter your phone number" />
      </Form.Item>

      {/* Submit Button */}
      {showSubmitButton && (
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitting} disabled={!isFormValid} block>
            {submitButtonText}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
}

ProfileForm.defaultProps = {
  submitButtonText: 'Submit',
  showSubmitButton: true,
  submitting: false,
  initialValues: {
    name: '',
    email: '',
    phone: '',
  },
};

export default ProfileForm;
