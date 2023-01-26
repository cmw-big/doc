import {type FC} from 'react'
export interface ButtonProps {

}
const Button:FC<ButtonProps> = (props)=>{
  return <button style={{fontSize: 20}}>我是button</button>
}
export default Button
