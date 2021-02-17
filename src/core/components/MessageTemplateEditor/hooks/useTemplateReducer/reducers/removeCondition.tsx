import {Template} from "../../../MessageTemplateEditor";
import {RemoveCondition} from "../useTemplateReducer.types";

export function removeCondition(template: Template, action: RemoveCondition): Template {
    console.log('removeCondition:', [JSON.stringify(template), JSON.stringify(action)]);
    if (template.id === action.payload.templateId) {

        const {
            conditionIndex
        } = action.payload;

        const newBody = template.body[conditionIndex] + (template.body[conditionIndex + 1] ? template.body[conditionIndex + 1] : '');

        return {
            ...template,
            conditions: [
                ...template.conditions.slice(0, conditionIndex),
                ...template.conditions.slice(conditionIndex+1),
            ],
            body: [
                ...template.body.slice(0, conditionIndex),
                newBody,
                ...template.body.slice(conditionIndex+2),
            ]
        };
    }

    return {
        ...template,
        conditions: template.conditions.map(condition => ({
            ...condition,
            then: removeCondition(condition.then, action),
            else: removeCondition(condition.else, action)
        }))
    }

}