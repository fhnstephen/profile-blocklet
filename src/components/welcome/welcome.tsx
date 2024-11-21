import { Form, Typography, message } from 'antd';
import { useCallback, useState } from 'react';

import ProfileCard from '../profile-card/profile-card';
import ProfileForm from '../profile-form/profile-form';

const { Text } = Typography;

type ProfileFormValues = {
  name: string;
  email: string;
  phone: string;
};

type WelcomeProps = {
  onCreateProfile: (values: ProfileFormValues) => any | Promise<any>; // Callback to handle profile creation
};

function Welcome({ onCreateProfile }: WelcomeProps): JSX.Element {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleFinish = useCallback(
    async (values: ProfileFormValues) => {
      setSubmitting(true); // Set the submitting state to true to block duplicate submissions
      try {
        await onCreateProfile(values); // Call the parent-provided callback to create a profile
        message.success('Profile created successfully');
      } finally {
        setSubmitting(false);
      }
      form.resetFields(); // Reset the form after submission
    },
    [onCreateProfile, form],
  );

  return (
    <ProfileCard title="Welcome to Booklet Profile!">
      <Text>It looks like you haven’t created a profile yet. Fill out the form below to get started.</Text>
      <div style={{ marginTop: 20 }}>
        <ProfileForm onSubmit={handleFinish} submitting={submitting} />
      </div>
    </ProfileCard>
  );
}

export default Welcome;
