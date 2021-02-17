import React, { FunctionComponent, HTMLAttributes } from 'react';
import styles from './Input.module.css';

export type InputProps = { description: string } & HTMLAttributes<HTMLInputElement>;

export const Input: FunctionComponent<InputProps> = ({description, ...rest}) => {
    return <div className={styles.container}>
        <div className={styles.description}>{description}</div>
        <input className={styles.input} {...rest} />
    </div>
};


