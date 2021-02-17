import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './Overlay.module.css';

export type OverlayProps = HTMLAttributes<HTMLDivElement>;

export const Overlay: FunctionComponent<OverlayProps> = ({...rest}) => {
    const className = classNames(styles.overlay);
    return <div className={className} {...rest} />
};


