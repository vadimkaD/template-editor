import React, {FunctionComponent} from 'react';
import {Condition, LastFocused} from "../MessageTemplateEditor";
import {Badge, GRAY, GREEN, RED} from "../../../../ui/badges/Badge/Badge";
import {ErrorButton} from "../../../../ui/buttons/ErrorButton/ErrorButton";
import {HIGHLIGHT} from "../../../../ui/textareas/Textarea/Textarea";
import {Flex, FlexProps} from "../../../../ui/flex/Flex";
import {TemplateBlock} from "../TemplateBlock/TemplateBlock";
import {
    OnRemoveCondition, OnUpdateExpression,
    UpdateBodyPayload
} from "../TemplateBlock/hooks/useTemplateReducer/useTemplateReducer.types";
import {TextareaBlock} from "../TemplateBlock/TextareaBlock";

export type IfElseBlockProps = {
    condition: Condition;
    setLastFocused: (lastFocused: LastFocused) => void;
    onUpdateBody: (payload: UpdateBodyPayload) => void;
    onRemoveCondition: OnRemoveCondition;
    onUpdateExpression: OnUpdateExpression;
    removeCondition: (e: React.SyntheticEvent) => void;
    updateExpression: (e: React.SyntheticEvent) => void;
    resetLastFocused: () => void;
    onLastTarget: (selectionStart: number) => void;
}

const Wrap = (props: FlexProps) => {
    return <Flex width={'140px'} minWidth={'140px'} container {...props}></Flex>
}

export const IfElseBlock: FunctionComponent<IfElseBlockProps> =
    ({
         condition,
         setLastFocused,
         onUpdateBody,
         onRemoveCondition,
         removeCondition,
         resetLastFocused,
         onUpdateExpression,
         updateExpression,
         onLastTarget
    }) => {

    const onBlur = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLTextAreaElement;
        onLastTarget(target.selectionStart);
        updateExpression(e);
    };

    return <>
        <Flex container alignItems={'flex-start'}>
            <Wrap>
                <Badge color={GRAY}>IF</Badge>
                <ErrorButton onClick={removeCondition}>delete</ErrorButton>
            </Wrap>
            <TextareaBlock text={condition.expression} intent={HIGHLIGHT} onBlur={onBlur}></TextareaBlock>
        </Flex>
        <Flex container alignItems={'flex-start'}>
            <Wrap>
                <Badge color={GREEN}>THEN</Badge>
            </Wrap>
            <Flex width={'100%'}>
                <TemplateBlock onUpdateExpression={onUpdateExpression} resetLastFocused={resetLastFocused} onRemoveCondition={onRemoveCondition} setLastFocused={setLastFocused} template={condition.then} onUpdateBody={onUpdateBody} />
            </Flex>
        </Flex>
        <Flex container alignItems={'flex-start'}>
            <Wrap>
                <Badge color={RED}>ELSE</Badge>
            </Wrap>
            <Flex width={'100%'}>
                <TemplateBlock onUpdateExpression={onUpdateExpression} resetLastFocused={resetLastFocused} onRemoveCondition={onRemoveCondition} setLastFocused={setLastFocused} onUpdateBody={onUpdateBody} template={condition.else}/>
            </Flex>

        </Flex>

    </>
};