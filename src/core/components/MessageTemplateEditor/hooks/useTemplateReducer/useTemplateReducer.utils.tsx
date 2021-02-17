import {Condition, Template} from "../../MessageTemplateEditor";
import {ID} from "../../MessageTemplateEditor.utils";

export function getEmptyTemplate(): Template {
    return {
        id: ID(),
        body: [''],
        conditions: []
    }
}

export function getEmptyCondition(): Condition {
    return {
        else: getEmptyTemplate(),
        expression: "",
        then: getEmptyTemplate()
    }
}