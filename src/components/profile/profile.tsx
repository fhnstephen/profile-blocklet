import { Card, Typography } from 'antd';

import { Profile as ProfileType } from '../../types/profile';

type ProfileProps = {
  profile: ProfileType;
};

const { Title, Text } = Typography;

export function Profile(props: ProfileProps): JSX.Element {
  const { name, email, phone } = props.profile;

  return (
    <Card
      style={{ width: 400, margin: '0 auto', borderRadius: 8 }}
      bordered
      hoverable
      title={<Title level={4}>User Profile</Title>}>
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <Title level={5} style={{ marginBottom: 16 }}>
          Hi, {name}!
        </Title>
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

export default Profile;
