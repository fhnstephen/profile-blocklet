import { Typography } from 'antd';

import { Profile as ProfileType } from '../../types/profile';
import ProfileCard from '../profile-card/profile-card';

type ProfileProps = {
  profile: ProfileType;
  title?: string;
};

const { Text } = Typography;

export function Profile(props: ProfileProps): JSX.Element {
  const {
    title,
    profile: { name, email, phone },
  } = props;

  return (
    <ProfileCard title={title}>
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
    </ProfileCard>
  );
}

Profile.defaultProps = {
  title: 'Your Profile Card',
};

export default Profile;
