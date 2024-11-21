import { Card, Typography } from 'antd';

import { Profile as ProfileType } from '../../types/profile';

type ProfileProps = {
  profile: ProfileType;
  title?: string;
};

const { Title, Text } = Typography;

export function Profile(props: ProfileProps): JSX.Element {
  const {
    title,
    profile: { name, email, phone },
  } = props;

  return (
    <Card
      style={{ width: 400, margin: '0 auto', borderRadius: 8 }}
      bordered
      hoverable
      title={<Title level={4}>{title}</Title>}>
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <Text>
          <strong>Name:</strong> {name}
        </Text>
        <br />
        <Text>
          <strong>Email:</strong> {email}
        </Text>
        <br />
        <Text>
          <strong>Phone:</strong> {phone}
        </Text>
      </div>
    </Card>
  );
}

Profile.defaultProps = {
  title: 'Your Profile Card',
};

export default Profile;
