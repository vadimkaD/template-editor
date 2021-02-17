import React, {FunctionComponent, HTMLAttributes } from 'react';

//вспомогательный компонент, который не нужен, если использовать styled-components

export type FlexProps = {
    className?: string,
    container?: boolean,
    flexDirection?: 'row' | 'column',
    justifyContent?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'initial'
        | 'inherit',
            flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse',
            alignItems?:
        | 'stretch'
        | 'center'
        | 'flex-start'
        | 'flex-end'
        | 'baseline'
        | 'initial'
        | 'inherit',
    flexGrow?: number,
    flexShrink?: number,
    flexBasis?: number,
    flex?: string,
    padding?: string,
    margin?: string,
    width?: string,
    height?: string,
    maxWidth?: string,
    maxHeight?: string,
    minWidth?: string,
    minHeight?: string,
} & HTMLAttributes<HTMLDivElement>

export const Flex:FunctionComponent<FlexProps> =
    ({
        className = '',
        container = false,
        justifyContent = 'flex-start',
        flexDirection= 'row',
        flexGrow = 0,
        flexBasis = 'auto',
        flexShrink= 1,
        flexWrap = 'nowrap',
        flex = '0 1 auto',
        alignItems = 'stretch',
        margin = '0',
        padding = '0',
        width = 'auto',
        height = 'auto',
        maxWidth = 'none',
        minHeight = 'none',
        minWidth = 'none',
        ...rest
    }) => (
    <div
        className={className}
        style={{
            display: container ? 'flex' : 'block',
            justifyContent,
            flexDirection,
            flexGrow,
            flexBasis,
            flexShrink,
            flexWrap,
            flex,
            alignItems,
            margin,
            padding,
            width,
            height,
            maxWidth,
            minHeight,
            minWidth,
        }}
        {...rest}
    />
);