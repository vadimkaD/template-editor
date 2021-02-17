import React, {FunctionComponent, useState, useEffect} from 'react';
import {Textarea, TextareaProps} from "../../../../ui/textareas/Textarea/Textarea";

export type TextareaBlockProps = {
    onBlur: (e: React.SyntheticEvent) => void;
    text: string;
} & TextareaProps;


export const TextareaBlock: FunctionComponent<TextareaBlockProps> =
    ({
         onBlur: outerOnBlur,
         text: inputText,
         ...rest
    }) => {
    const [text, setText] = useState<string | undefined>(inputText);
    useEffect(() => setText(inputText), [inputText]);
    const onFocus = (e:React.SyntheticEvent) => {
      setText(undefined);
    };
    const onBlur = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLTextAreaElement;
        setText(target.value);
        outerOnBlur(e);
    };
    return <Textarea onBlur={onBlur} onFocus={onFocus} value={text} onChange={e => null} {...rest} />
};