import { Tooltip, Typography } from 'antd';

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
          <strong>Name:</strong>{' '}
          <Tooltip title={name}>
            <Text ellipsis style={{ maxWidth: 150, display: 'inline-block' }}>
              {name}
            </Text>
          </Tooltip>
        </Text>
        <br />
        <Text>
          <strong>Email:</strong>{' '}
          <Tooltip title={email}>
            <Text ellipsis style={{ maxWidth: 150, display: 'inline-block' }}>
              {email}
            </Text>
          </Tooltip>
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
