import React, {FunctionComponent} from 'react';
import {BODY_TARGET, EXPRESSION_TARGET, LastFocused, Template} from "../MessageTemplateEditor";
import {IfElseBlock} from "../IfElseBlock/IfElseBlock";
import {Flex} from "../../../../ui/flex/Flex";
import {TextareaBlock} from "./TextareaBlock";
import {
    OnRemoveCondition,
    OnUpdateExpression,
    UpdateBodyPayload,
} from "../hooks/useTemplateReducer/useTemplateReducer.types";

export type TemplateBlockProps = {
    template: Template;
    setLastFocused: (lastFocused: LastFocused) => void;
    onUpdateBody: (payload: UpdateBodyPayload) => void;
    onRemoveCondition: OnRemoveCondition;
    resetLastFocused: () => void;
    onUpdateExpression: OnUpdateExpression;
}

export const TemplateBlock: FunctionComponent<TemplateBlockProps> =
    ({
         template,
         setLastFocused,
         onUpdateBody,
         onRemoveCondition,
         resetLastFocused,
         onUpdateExpression,
    }) => {

    const onBlur = (bodyIndex: number) => (e: React.SyntheticEvent) => {
        const target = e.target as HTMLTextAreaElement;
        const lastFocused: LastFocused = {
            templateId: template.id,
            index: bodyIndex,
            selectionStart: target.selectionStart,
            target: BODY_TARGET
        };
        setLastFocused(lastFocused);
        onUpdateBody({
            body: target.value,
            bodyIndex,
            templateId: template.id
        });
    };

    const removeCondition = (index: number) => (e: React.SyntheticEvent) => {
        onRemoveCondition({
            conditionIndex: index,
            templateId: template.id
        });
        resetLastFocused();
    };

    const updateExpression = (index: number) => (e: React.SyntheticEvent) => {
      const target = e.target as HTMLTextAreaElement;

      onUpdateExpression({
          conditionIndex: index,
          expression: target.value,
          templateId: template.id
      })
    };

    const onLastTarget = (index: number) => (selectionStart: number) => {
        const lastFocused: LastFocused = {
            templateId: template.id,
            index: index,
            selectionStart,
            target: EXPRESSION_TARGET,
        };
        setLastFocused(lastFocused);
    };


    return <>
        {template.body.map((text, index) => {
            return <React.Fragment key={index}>
                <Flex>
                    <TextareaBlock onBlur={onBlur(index)} text={text} />
                </Flex>
                {template.conditions[index]
                    ? <IfElseBlock
                        onUpdateExpression={onUpdateExpression}
                        resetLastFocused={resetLastFocused}
                        setLastFocused={setLastFocused}
                        onUpdateBody={onUpdateBody}
                        condition={template.conditions[index]}
                        onRemoveCondition={onRemoveCondition}
                        removeCondition={removeCondition(index)}
                        updateExpression={updateExpression(index)}
                        onLastTarget={onLastTarget(index)}
                    />
                    : null}
                </React.Fragment>
        })}
    </>
};