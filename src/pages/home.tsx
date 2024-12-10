import { PhoneOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import { useCallback, useMemo, useRef, useState } from 'react';

import { DialButton } from '../components/dial-button';
import './home.css';

function createDialButtonConfig(num: number | string, subText?: string) {
  return {
    num: num.toString(),
    subText,
    keys: [num.toString(), ...(subText?.split('') || [])],
  };
}

function cutTextIfTooLong(text: string, trimLength = 15): string {
  if (text.length < trimLength) return text;
  // trim the beginning to '...' and keep trim-length-long text
  const start = text.length - trimLength;
  return `...${text.substring(start, start + trimLength)}`;
}

const repeatInterval = 500; // ms

function Home() {
  const dialButtons = useMemo(
    () => [
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
    ],
    [],
  );
  const [text, setText] = useState('');
  const currentKeyRef = useRef<string[] | null>(null);
  const currentKeyRemoveTimeoutRef = useRef<any>(null);
  const onDeleteClick = useCallback(() => {
    setText((preText) => preText.substring(0, preText.length - 1));
    // delete triggered key if any
    currentKeyRef.current = null;
  }, []);

  const onButtonClick = useCallback(
    (keys: string[]) => {
      if (currentKeyRef.current !== keys || keys.length === 1) {
        // no same key triggered, handles it normally
        currentKeyRef.current = keys;
        setText((preText) => preText + keys[0]);
        // reset the timeout to remove the triggered key after preset interval
        clearTimeout(currentKeyRemoveTimeoutRef.current);
        currentKeyRemoveTimeoutRef.current = setTimeout(() => {
          currentKeyRef.current = null;
        }, repeatInterval);
      } else if (text.length && keys.length > 1) {
        // same key triggered, change the last text
        const lastInput = text[text.length - 1] || '';
        const index = keys.indexOf(lastInput);
        const nextIndex = (index + 1) % keys.length;
        setText((preText) => preText.substring(0, preText.length - 1) + keys[nextIndex]);
        // reset the timeout to remove the triggered key after preset interval
        clearTimeout(currentKeyRemoveTimeoutRef.current);
        currentKeyRemoveTimeoutRef.current = setTimeout(() => {
          currentKeyRef.current = null;
        }, repeatInterval);
      }
    },
    [text],
  );
  return (
    <div style={{ width: 200 }}>
      <div style={{ minHeight: 50, marginBottom: 70 }}>
        <Typography.Title level={2}>{cutTextIfTooLong(text)}</Typography.Title>
      </div>
      <Row align="middle" gutter={[8, 16]}>
        {dialButtons.map(({ num, subText, keys }) => {
          return (
            <Col span={8} key={num}>
              <DialButton main={num} subText={subText} onClick={() => onButtonClick(keys)} />
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
