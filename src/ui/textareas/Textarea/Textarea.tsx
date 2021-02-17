import React, { FunctionComponent, TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Textarea.module.css';

export const NORMAL = 'NORMAL';
export const HIGHLIGHT = 'HIGHLIGHT';
export type INTENT = typeof NORMAL | typeof HIGHLIGHT;

export type TextareaProps = {
    intent?: INTENT,
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea: FunctionComponent<TextareaProps> = ({intent = NORMAL, ...rest}) => {
    const className = classNames(styles.textarea, {
        [styles.highlight]: intent === HIGHLIGHT,
        [styles.normal]: intent === NORMAL,
    });

    return <textarea className={className} {...rest} />
};
