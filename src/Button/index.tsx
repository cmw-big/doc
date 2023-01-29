import { type FC } from 'react';
export interface ButtonProps {
  /**
   * 我表示类型
   */
  type?: string;
}
const Button: FC<ButtonProps> = (props) => {
  return <button style={{ fontSize: 20 }}>我是button</button>;
};
export default Button;

type Colors = 'red' | 'green' | 'blue';

type RGB = [red: number, green: number, blue: number];
type o = Partial<Record<Colors, string | RGB>>;

enum T {
  a = 'a',
  b = 'b',
}
type f = Partial<Record<T, number | string>>;
const tt: f = {
  [T.a]: 1,
} satisfies f;

const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
} satisfies o;

// 依然可以访问这些方法
const redComponent = palette.red.map;
const greenNormalized = palette.green.toUpperCase();
