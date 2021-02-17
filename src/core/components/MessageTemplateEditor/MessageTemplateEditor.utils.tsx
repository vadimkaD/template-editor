import {Template} from "./MessageTemplateEditor";

export function hasConditions(template: Template): boolean {
    return template.conditions.length > 0;
}

export const ID = function (): string {
    return '_' + Math.random().toString(36).substr(2, 16);
};

export type Variables = {[variable: string]: string};

export const testTemplate: Template = {
    "id": "_uumtd6adf",
    "body": ["Hello {first_name}!\n\nI just went through {not_existing_var_name} your profile and i would love to join your network!\n\n", "\n\nJake\nSoftware {not_existing_vaas__r_name}}}{}Developer\njakelen1232@gmail.com"],
    "conditions": [{
        "else": {
            "id": "_5sbvu0ry4",
            "body": ["Where do you work {not_existing_vaas__r_name} at the moment?"],
            "conditions": []
        },
        "expression": "{company}",
        "then": {
            "id": "_lhzlpydbb",
            "body": ["I know you {not_eg_vaas__r_name}work at {company}", " :)"],
            "conditions": [{
                "else": {
                    "id": "_k8hvzk67g",
                    "body": [". But what is your role?"],
                    "conditions": []
                },
                "expression": "{position}",
                "then": {
                    "id": "_1bl3vj6rn",
                    "body": [" as {position}"],
                    "conditions": []
                }
            }]
        }
    }]
}

export function enrichTextWithValues(text: string, values: Variables, arrVarNames: Array<string>): string {
    let finalText: string = text;

    for (const arrVarName of arrVarNames) {
        // eslint-disable-next-line no-useless-escape
        finalText = finalText.replace(new RegExp('\{'+arrVarName+'\}', 'gi'), values[arrVarName] ? values[arrVarName] : '');
    }
    return finalText;
}

