import { FC,HTMLAttributes } from 'react';
import styles from "./Button.module.scss"

interface IButton extends  HTMLAttributes<HTMLAnchorElement> {
  children?: JSX.Element | string;
  primary?: boolean;
  size?: string;
  width?: string;
}

export const Button: FC<IButton> = ({children, onClick, primary, size = '22px', width}) => {
  return (
    <a 
      className={`${styles.Button} ${primary && styles.primary}`}
      style={{ fontSize: `${size}`, width: `${width || 'fit-content'}`}}
      onClick={onClick}
    >
      {children}
    </a>
  )
}