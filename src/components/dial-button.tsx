import { Button } from 'antd';

type DialButtonProps = {
  main: string;
  subText?: string;
  onClick?: () => void;
};

export const DialButton: React.FC<DialButtonProps> = function ({ main, subText = ' ', onClick }) {
  return (
    <Button onClick={onClick} shape="circle" className="DialButton DialButtonBg">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>{main}</div>
        <div>{subText}</div>
      </div>
    </Button>
  );
};
