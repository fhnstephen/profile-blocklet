import { PhoneOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import { useCallback, useState } from 'react';

import { DialButton } from '../components/dial-button';
import './home.css';

function createDialButtonConfig(num: number | string, subText?: string) {
  return {
    num: num.toString(),
    subText,
  };
}

function cutTextIfTooLong(text: string, trimLength = 15): string {
  if (text.length < trimLength) return text;
  // trim the beginning to '...' and keep trim-length-long text
  const start = text.length - trimLength;
  return `...${text.substring(start, start + trimLength - 1)}`;
}

function Home() {
  const dialButtons = [
    createDialButtonConfig(1),
    createDialButtonConfig(2, 'ABC'),
    createDialButtonConfig(3, 'DEF'),
    createDialButtonConfig(4, 'GHI'),
    createDialButtonConfig(5, 'JKL'),
    createDialButtonConfig(6, 'MNO'),
    createDialButtonConfig(7, 'PQRS'),
    createDialButtonConfig(8, 'TUV'),
    createDialButtonConfig(9, 'WXYZ'),
    createDialButtonConfig('*'),
    createDialButtonConfig(0, '+'),
    createDialButtonConfig('#'),
  ];
  const [text, setText] = useState('');
  const onDeleteClick = useCallback(() => {
    setText((preText) => preText.substring(0, preText.length - 1));
  }, []);
  return (
    <div style={{ width: 200 }}>
      <div style={{ minHeight: 50, marginBottom: 70 }}>
        <Typography.Title level={2}>{cutTextIfTooLong(text)}</Typography.Title>
      </div>
      <Row align="middle" gutter={[8, 16]}>
        {dialButtons.map(({ num, subText }) => {
          return (
            <Col span={8} key={num}>
              <DialButton main={num} subText={subText} onClick={() => setText((preText) => preText + num)} />
            </Col>
          );
        })}
        <Col span={8} offset={8}>
          <Button
            shape="circle"
            icon={<PhoneOutlined />}
            style={{ width: 50, height: 50, backgroundColor: 'rgb(101, 187, 92)' }}
          />
        </Col>
        {text && (
          <Col span={8}>
            <Button onClick={onDeleteClick} className="DialButtonBg">
              x
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default Home;
