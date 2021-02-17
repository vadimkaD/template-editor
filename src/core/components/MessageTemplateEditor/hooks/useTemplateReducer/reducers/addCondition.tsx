import {Template} from "../../../MessageTemplateEditor";
import {getEmptyCondition} from "../useTemplateReducer.utils";
import {AddCondition} from "../useTemplateReducer.types";

export function addCondition(template: Template, action: AddCondition): Template {
    console.log('addCondition:', [JSON.stringify(template), JSON.stringify(action)]);
    if (template.id === action.payload.templateId) {

        const {
            bodyIndex,
            breakAt,
        } = action.payload;

        return {
            ...template,
            body: [
                ...template.body.slice(0, bodyIndex),
                template.body[bodyIndex].slice(0, breakAt),
                template.body[bodyIndex].slice(breakAt),
                ...template.body.slice(bodyIndex + 1),
            ],
            conditions: [
                ...template.conditions.slice(0, bodyIndex),
                getEmptyCondition(),
                ...template.conditions.slice(bodyIndex),
            ],
        };
    }

    return {
        ...template,
        conditions: template.conditions.map(condition => ({
            ...condition,
            then: addCondition(condition.then, action),
            else: addCondition(condition.else, action)
        }))
    }

}