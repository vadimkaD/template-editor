import {Template} from "../MessageTemplateEditor";
import {enrichTextWithValues, Variables} from "../MessageTemplateEditor.utils";

export type GetTextFromTemplate = (
    template: Template,
    values: Variables,
    arrVarNames: Array<string>,
) => string;

//для того, чтобы понять, какие переменные существуют, объекта values недостаточно
//мне нужен исходный массив arrVarNames, потому что его нет в формате шаблона
//и в описании к требованиям шаблона этого нет
//исходя из описания формата компонента MessageTemplateEditor, можно сделать вывод, что
//arrVarNames не должны быть в шаблоне
//но исходя из сигнатуры этой функции, должны, поскольку логически с ним связаны
//как быть?
//проще всего добавить arrVarNames в сигнатуру getTextFromTemplate, так и сделаю
//добавлять arrVarNames в сигнатуру шаблона не хочется,
//поскольку тип Template очень хорошо ложится на рекурсивный рендер
//пришлось бы в итоге дифференцировать сигнатуры по Template/RootTemplate
//считаю это решение оптимальным

export const getTextFromTemplate: GetTextFromTemplate = (template, values, arrVarNames) => {

    const text = template.body.reduce((total, bodyElement, index) => {
        const bodyText = enrichTextWithValues(bodyElement, values, arrVarNames);
        let conditionText = '';
        if (template.conditions[index]) {
            const expr = enrichTextWithValues(template.conditions[index].expression, values, arrVarNames);
            if (expr) {
                conditionText = getTextFromTemplate(template.conditions[index].then, values, arrVarNames);
            } else {
                conditionText = getTextFromTemplate(template.conditions[index].else, values, arrVarNames);
            }
        }
        return total + bodyText + conditionText;
    }, '');

    return text;
};