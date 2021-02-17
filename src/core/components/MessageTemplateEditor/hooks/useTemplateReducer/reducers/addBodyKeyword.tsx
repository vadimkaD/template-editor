import {Template} from "../../../../MessageTemplateEditor";
import {AddBodyKeyword, } from "../useTemplateReducer.types";

export function addBodyKeyword(template: Template, action: AddBodyKeyword): Template {
    console.log('addBodyKeyword:', [JSON.stringify(template), JSON.stringify(action)]);
    if (template.id === action.payload.templateId) {

        const {
            keyword,
            bodyIndex,
            addAt,
        } = action.payload;

        return {
            ...template,
            body: [
                ...template.body.slice(0, bodyIndex),
                template.body[bodyIndex].slice(0, addAt) + keyword + template.body[bodyIndex].slice(addAt),
                ...template.body.slice(bodyIndex + 1),
            ],
        };
    }

    return {
        ...template,
        conditions: template.conditions.map(condition => ({
            ...condition,
            then: addBodyKeyword(condition.then, action),
            else: addBodyKeyword(condition.else, action)
        }))
    }

}