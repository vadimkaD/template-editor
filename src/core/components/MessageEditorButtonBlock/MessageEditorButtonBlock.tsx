import React, {FunctionComponent} from "react";
import {Flex} from "../../../ui/flex/Flex";
import {PrimaryButton} from "../../../ui/buttons/PrimaryButton/PrimaryButton";

type MessageEditorButtonBlockProps = {
    onClick: (e: React.SyntheticEvent) => void;
}

export const MessageEditorButtonBlock:FunctionComponent<MessageEditorButtonBlockProps> = ({onClick}) => (
    <Flex width={'100%'} height={'100vh'} container alignItems={'center'} justifyContent={'center'}>
        <PrimaryButton onClick={onClick}>Message Editor</PrimaryButton>
    </Flex>
);