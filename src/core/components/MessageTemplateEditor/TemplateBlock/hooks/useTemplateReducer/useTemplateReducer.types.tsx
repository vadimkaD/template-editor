import {
    UPDATE_BODY,
    ADD_CONDITION,
    REMOVE_CONDITION,
    UPDATE_EXPRESSION,
    ADD_BODY_KEYWORD,
    ADD_CONDITION_KEYWORD,
} from "./useTemplateReducer.constants";

export type ActionType<T, P> = {type: T, payload: P};
export type onAction<T> = (payload: T) => void;

export type AddConditionPayload = {expression: string, templateId: string, bodyIndex: number, breakAt: number };
export type AddCondition = ActionType<typeof ADD_CONDITION, AddConditionPayload>;

export type UpdateBodyPayload = {body: string, templateId: string, bodyIndex: number };
export type UpdateBody = ActionType<typeof UPDATE_BODY, UpdateBodyPayload>;

export type RemoveConditionPayload = {templateId: string, conditionIndex: number};
export type RemoveCondition = ActionType<typeof REMOVE_CONDITION, RemoveConditionPayload>;
export type OnRemoveCondition = onAction<RemoveConditionPayload>;

export type UpdateExpressionPayload = {expression: string, templateId: string, conditionIndex: number};
export type UpdateExpression = ActionType<typeof UPDATE_EXPRESSION, UpdateExpressionPayload>;
export type OnUpdateExpression = onAction<UpdateExpressionPayload>;

export type AddBodyKeywordPayload = {keyword: string, templateId: string, bodyIndex: number, addAt: number};
export type AddBodyKeyword = ActionType<typeof ADD_BODY_KEYWORD, AddBodyKeywordPayload>;
export type OnAddBodyKeyword = onAction<AddBodyKeywordPayload>;

export type AddConditionKeywordPayload = {keyword: string, templateId: string, conditionIndex: number, addAt: number};
export type AddConditionKeyword = ActionType<typeof ADD_CONDITION_KEYWORD, AddConditionKeywordPayload>;
export type OnAddConditionKeyword = onAction<AddConditionKeywordPayload>;



export type Action =
    | AddCondition
    | UpdateBody
    | RemoveCondition
    | UpdateExpression
    | AddBodyKeyword
    | AddConditionKeyword;