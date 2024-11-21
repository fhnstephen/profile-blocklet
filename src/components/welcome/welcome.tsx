import { Button, Card, Form, Input, Typography } from 'antd';

const { Title, Text } = Typography;

type ProfileFormValues = {
  name: string;
  email: string;
  phone: string;
};

type WelcomeProps = {
  onCreateProfile: (values: ProfileFormValues) => void; // Callback to handle profile creation
};

function Welcome({ onCreateProfile }: WelcomeProps): JSX.Element {
  const [form] = Form.useForm();

  const handleFinish = (values: ProfileFormValues) => {
    onCreateProfile(values);
    form.resetFields(); // Reset the form after submission
  };

  return (
    <Card
      style={{ maxWidth: 500, margin: '50px auto', padding: '20px', borderRadius: 8 }}
      bordered
      title={<Title level={4}>Welcome to Our App!</Title>}>
      <Text>It looks like you haven’t created a profile yet. Fill out the form below to get started.</Text>

      <Form form={form} layout="vertical" onFinish={handleFinish} style={{ marginTop: 20 }}>
        {/* Name Field */}
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
          <Input placeholder="Enter your name" />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}>
          <Input placeholder="Enter your email" />
        </Form.Item>

        {/* Phone Field */}
        <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please enter your phone number' }]}>
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Profile
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Welcome;
