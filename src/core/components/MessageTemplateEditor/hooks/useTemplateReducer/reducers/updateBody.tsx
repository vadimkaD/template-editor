import {Template} from "../../../MessageTemplateEditor";
import {UpdateBody} from "../useTemplateReducer.types";

export function updateBody(template: Template, action: UpdateBody): Template {

    if (template.id === action.payload.templateId) {

        const {
            body,
            bodyIndex
        } = action.payload;

        return {
            ...template,
            body: [
                ...template.body.slice(0, bodyIndex),
                body,
                ...template.body.slice(bodyIndex + 1),
            ],
        };
    }

    return {
        ...template,
        conditions: template.conditions.map(condition => ({
            ...condition,
            then: updateBody(condition.then, action),
            else: updateBody(condition.else, action)
        }))
    }

}