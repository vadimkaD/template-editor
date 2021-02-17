import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';
export const PRIMARY = 'PRIMARY';
export const CANCEL = 'CANCEL';
export type INTENT = typeof SUCCESS | typeof ERROR | typeof PRIMARY | typeof CANCEL;

export type ButtonProps = {
    intent?: INTENT,
    type?: 'button' | 'submit' | 'reset'
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FunctionComponent<ButtonProps> = ({intent = PRIMARY, type = 'button', ...rest}) => {
    const className = classNames(styles.button, {
        [styles.cancel]: intent === CANCEL,
        [styles.error]: intent === ERROR,
        [styles.primary]: intent === PRIMARY,
        [styles.success]: intent === SUCCESS,
    });

    return <button className={className} type={type} {...rest} />
};

//комментарий для того, кто это прочтет
//styled-components позволяет абстрагировать css до уровня бизнес-логики
//то есть убирает модули
//убирает css-классы
//настоятельно рекомендую

