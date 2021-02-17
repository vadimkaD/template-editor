import {Template} from "../../../MessageTemplateEditor";
import {
    AddConditionKeyword,
} from "../useTemplateReducer.types";

export function addConditionKeyword(template: Template, action: AddConditionKeyword): Template {
    console.log('addConditionKeyword:', [JSON.stringify(template), JSON.stringify(action)]);
    if (template.id === action.payload.templateId) {

        const {
            keyword,
            conditionIndex,
            addAt,
        } = action.payload;

        return {
            ...template,
            conditions: [
                ...template.conditions.slice(0, conditionIndex),
                {...template.conditions[conditionIndex], expression:
                        template.conditions[conditionIndex].expression.slice(0, addAt) + keyword + template.conditions[conditionIndex].expression.slice(addAt), },
                ...template.conditions.slice(conditionIndex + 1),
            ]
        };
    }

    return {
        ...template,
        conditions: template.conditions.map(condition => ({
            ...condition,
            then: addConditionKeyword(condition.then, action),
            else: addConditionKeyword(condition.else, action)
        }))
    }

}