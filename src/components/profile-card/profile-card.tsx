import { Card } from 'antd';
import Title from 'antd/es/typography/Title';

type CardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  title?: string;
};

function ProfileCard({ children, style, title }: CardProps): JSX.Element {
  return (
    <Card
      style={{ maxWidth: 500, margin: '50px auto', padding: '20px', borderRadius: 8, ...style }}
      bordered
      title={<Title level={4}>{title}</Title>}>
      {children}
    </Card>
  );
}

ProfileCard.defaultProps = {
  title: 'Profile',
  style: {},
};

export default ProfileCard;
