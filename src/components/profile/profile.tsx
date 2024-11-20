import { Profile as ProfileType } from '../../types/profile';

type ProfileProps = {
  profile: ProfileType;
};

export function Profile(props: ProfileProps): JSX.Element {
  const { name, email, phone } = props.profile;
  return (
    <div>
      <h1>Hi, {name}</h1>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
    </div>
  );
}

export default Profile;
