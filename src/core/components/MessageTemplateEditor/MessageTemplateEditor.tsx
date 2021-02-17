import React, {FunctionComponent, useCallback, useState} from 'react';
import {Flex} from "../../../ui/flex/Flex";
import {SuccessButton} from "../../../ui/buttons/SuccessButton/SuccessButton";
import {PrimaryButton} from "../../../ui/buttons/PrimaryButton/PrimaryButton";
import {Badge, GRAY, GREEN, RED} from "../../../ui/badges/Badge/Badge";
import {TemplateBlock} from "./TemplateBlock/TemplateBlock";
import {useTemplateReducer} from "./TemplateBlock/hooks/useTemplateReducer/useTemplateReducer";
import {getEmptyTemplate} from "./TemplateBlock/hooks/useTemplateReducer/useTemplateReducer.utils";

export type Condition = {
    expression: string;
    then: Template;
    else: Template;
};

export type Template = {
    id: string;
    body: string[];
    conditions: Condition[];
};

export type MessageTemplateEditorProps = {
    arrVarNames: Array<string>;
    template?: Template;
}

export const BODY_TARGET = 'BODY_TARGET';
export const EXPRESSION_TARGET = 'EXPRESSION_TARGET';

export type FocusedTarget =
    | typeof BODY_TARGET
    | typeof EXPRESSION_TARGET;

export type LastFocused = {
  templateId: string;
  index: number;
  selectionStart: number;
  target: FocusedTarget;
};

export const MessageTemplateEditor: FunctionComponent<MessageTemplateEditorProps> = ({arrVarNames = [], template = getEmptyTemplate()}) => {

    const [lastFocused, setLastFocused] = useState<LastFocused>({
        templateId: template.id,
        index: 0,
        selectionStart: 0,
        target: BODY_TARGET
    });

    const resetLastFocused = useCallback(() => {
        setLastFocused({
            templateId: template.id,
            index: 0,
            selectionStart: 0,
            target: BODY_TARGET,
        });
    }, [setLastFocused]);

    const {
        innerTemplate,
        onAddCondition,
        onUpdateBody,
        onRemoveCondition,
        onUpdateExpression,
        onAddBodyKeyword,
        onAddConditionKeyword,
    } = useTemplateReducer(template);

    const addCondition = useCallback(() => {
        if (lastFocused.target === BODY_TARGET) {
            onAddCondition({
                bodyIndex: lastFocused.index,
                breakAt: lastFocused.selectionStart,
                templateId: lastFocused.templateId,
                expression: ''
            });
        }

        else {
            alert('Последний раз курсор видели в районе IF :) Сбрасываю на начало шаблона...');
            resetLastFocused();
            onAddCondition({
                bodyIndex: 0,
                breakAt: 0,
                templateId: template.id,
                expression: ''
            });
        }

    }, [lastFocused, onAddCondition]);



    const addBodyKeyword = (keyword: string) => (e: React.SyntheticEvent) => {
        onAddBodyKeyword({
            addAt: lastFocused.selectionStart,
            bodyIndex: lastFocused.index,
            keyword: keyword,
            templateId: lastFocused.templateId
        });
    };

    const addConditionKeyword = (keyword: string) => (e: React.SyntheticEvent) => {
        onAddConditionKeyword({
            addAt: lastFocused.selectionStart,
            conditionIndex: lastFocused.index,
            keyword: keyword,
            templateId: lastFocused.templateId
        });
    };



    return (
        <Flex  margin={'0 0 0 5px'}>
            <Flex container justifyContent={'center'} margin={'10px 0 15px 0'}>Message Template Editor</Flex>
            <Flex container width={'100%'} alignItems={'center'} padding={'5px 0'}>
                {arrVarNames.map((variable, index) => <Flex margin={index > 0 ? '0 0 0 5px' : '0'} key={variable}>
                    <SuccessButton onClick={lastFocused.target === BODY_TARGET ? addBodyKeyword('{'+variable+'}') : addConditionKeyword('{'+variable+'}')}>&#123;{variable}&#125;</SuccessButton>
                </Flex>)}
            </Flex>
            <Flex container>
                <PrimaryButton onClick={addCondition}>
                    <b>
                        Click to add:
                        &nbsp;<Badge color={GRAY}>IF</Badge>&nbsp;
                    </b>
                    [&#123;some_variable&#125; or expression]
                    &nbsp;<Badge color={GREEN}>THEN</Badge>&nbsp;
                    [then_value]
                    &nbsp;<Badge color={RED}>ELSE</Badge>&nbsp;
                    [else_value]
                </PrimaryButton>
            </Flex>
            <Flex margin={'5px 0'}>
                 <TemplateBlock
                     resetLastFocused={resetLastFocused}
                     template={innerTemplate}
                     setLastFocused={setLastFocused}
                     onUpdateBody={onUpdateBody}
                     onRemoveCondition={onRemoveCondition}
                     onUpdateExpression={onUpdateExpression}
                 ></TemplateBlock>
            </Flex>
        </Flex>
    )
};