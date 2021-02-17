import React, {FunctionComponent, HTMLAttributes} from 'react';
import classNames from "classnames";
import styles from './Badge.module.css';

export const GREEN = 'GREEN';
export const RED = 'RED';
export const GRAY = 'GRAY';
export type COLOR = typeof GREEN | typeof RED | typeof GRAY;

type BadgeProps = {
    color?: COLOR
} & HTMLAttributes<HTMLDivElement>;

export const Badge: FunctionComponent<BadgeProps> = ({color = GREEN, ...rest}) => {

    const className = classNames(styles.badge, {
        [styles.green]: color === GREEN,
        [styles.red]: color === RED,
        [styles.gray]: color === GRAY,
    });
    return <div className={className} {...rest} />
};