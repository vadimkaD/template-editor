import {Template} from "./MessageTemplateEditor";

export function hasConditions(template: Template): boolean {
    return template.conditions.length > 0;
}

export const ID = function (): string {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};