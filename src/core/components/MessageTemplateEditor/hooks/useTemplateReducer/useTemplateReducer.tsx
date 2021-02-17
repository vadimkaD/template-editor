import {useCallback, useReducer} from "react";
import {Template} from "../../MessageTemplateEditor";
import {addCondition} from "./reducers/addCondition";
import {
    Action,
    AddBodyKeywordPayload,
    AddConditionKeywordPayload,
    AddConditionPayload,
    OnAddBodyKeyword,
    OnAddConditionKeyword,
    OnRemoveCondition,
    OnUpdateExpression,
    RemoveConditionPayload,
    UpdateBodyPayload,
    UpdateExpressionPayload
} from "./useTemplateReducer.types";
import {
    ADD_BODY_KEYWORD,
    ADD_CONDITION,
    ADD_CONDITION_KEYWORD,
    REMOVE_CONDITION,
    UPDATE_BODY,
    UPDATE_EXPRESSION
} from "./useTemplateReducer.constants";
import {updateBody} from "./reducers/updateBody";
import {removeCondition} from "./reducers/removeCondition";
import {updateExpression} from "./reducers/updateExpression";
import {addBodyKeyword} from "./reducers/addBodyKeyword";
import {addConditionKeyword} from "./reducers/addConditionKeyword";


function reducer(state: Template, action: Action) {
    switch (action.type) {
        case ADD_CONDITION: {
            return addCondition(state, action);
        }
        case UPDATE_BODY: {
            return updateBody(state, action);
        }
        case REMOVE_CONDITION: {
            return removeCondition(state, action);
        }
        case UPDATE_EXPRESSION: {
            return updateExpression(state, action);
        }
        case ADD_BODY_KEYWORD: {
            return addBodyKeyword(state, action);
        }
        case ADD_CONDITION_KEYWORD: {
            return addConditionKeyword(state, action);
        }
        default: {
            return state;
        }
    }

}

export type TemplateReducer = {
    innerTemplate: Template;
    onAddCondition: (payload: AddConditionPayload) => void;
    onUpdateBody: (payload: UpdateBodyPayload) => void;
    onRemoveCondition: OnRemoveCondition;
    onUpdateExpression: OnUpdateExpression;
    onAddBodyKeyword: OnAddBodyKeyword;
    onAddConditionKeyword: OnAddConditionKeyword;
}

export function useTemplateReducer(inputTemplate: Template): TemplateReducer {
    const [innerTemplate, dispatch] = useReducer(reducer, inputTemplate);

    const onAddCondition = useCallback((payload: AddConditionPayload) => {
        dispatch({type: ADD_CONDITION, payload});
    }, [dispatch]);

    const onUpdateBody = useCallback((payload: UpdateBodyPayload) => {
        dispatch({type: UPDATE_BODY, payload});
    }, [dispatch]);

    const onRemoveCondition = useCallback((payload: RemoveConditionPayload) => {
       dispatch({type: REMOVE_CONDITION, payload});
    }, [dispatch]);

    const onUpdateExpression = useCallback((payload: UpdateExpressionPayload) => {
        dispatch({type: UPDATE_EXPRESSION, payload});
    }, [dispatch]);

    const onAddBodyKeyword = useCallback((payload: AddBodyKeywordPayload) => {
        dispatch({type: ADD_BODY_KEYWORD, payload});
    }, [dispatch]);

    const onAddConditionKeyword = useCallback((payload: AddConditionKeywordPayload) => {
        dispatch({type: ADD_CONDITION_KEYWORD, payload});
    }, [dispatch]);

    return {
        innerTemplate,
        onAddCondition,
        onRemoveCondition,
        onUpdateBody,
        onUpdateExpression,
        onAddBodyKeyword,
        onAddConditionKeyword,
    }
}