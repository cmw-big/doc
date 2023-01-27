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
