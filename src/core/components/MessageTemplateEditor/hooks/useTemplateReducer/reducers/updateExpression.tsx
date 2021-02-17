import {Template} from "../../../../MessageTemplateEditor";
import { UpdateExpression} from "../useTemplateReducer.types";

export function updateExpression(template: Template, action: UpdateExpression): Template {

    if (template.id === action.payload.templateId) {

        const {
            expression,
            conditionIndex,
        } = action.payload;

        return {
            ...template,
            conditions: [
                ...template.conditions.slice(0, conditionIndex),
                {...template.conditions[conditionIndex], expression},
                ...template.conditions.slice(conditionIndex + 1),
            ]
        };
    }

    return {
        ...template,
        conditions: template.conditions.map(condition => ({
            ...condition,
            then: updateExpression(condition.then, action),
            else: updateExpression(condition.else, action)
        }))
    }

}