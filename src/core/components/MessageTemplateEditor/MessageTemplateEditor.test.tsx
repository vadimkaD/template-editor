import {getEmptyTemplate} from "./hooks/useTemplateReducer/useTemplateReducer.utils";
import {Template} from "./MessageTemplateEditor";
import {getTextFromTemplate} from "./utils/getTextFromTemplate";


describe('Text generation from template', () => {

    const arrVarNames = ['first_name', 'last_name', 'company', 'position'];
    const testTemplate: Template = {
        "id": "_uumtd6adf",
        "body": ["Hello {first_name}!\n\nI just went through your profile and i would love to join your network!\n\n", "\n\nJake\nSoftware Developer\njakelen1232@gmail.com"],
        "conditions": [{
            "else": {
                "id": "_5sbvu0ry4",
                "body": ["Where do you work at the moment?"],
                "conditions": []
            },
            "expression": "{company}",
            "then": {
                "id": "_lhzlpydbb",
                "body": ["I know you work at {company}", " :)"],
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
    };
    const testTemplateWithUnusedVars: Template = {
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
    };

    it('generates empty text from empty template', () => {

        const emptyTemplate = getEmptyTemplate();
        const expectedResult = '';
        const result = getTextFromTemplate(emptyTemplate, {}, arrVarNames)
        expect(result).toEqual(expectedResult);
    });

    it('generates text from not empty template', () => {

        const expectedResult = "Hello !\n\nI just went through your profile and i would love to join your network!\n\nWhere do you work at the moment?\n\nJake\nSoftware Developer\njakelen1232@gmail.com";
        const result = getTextFromTemplate(testTemplate, {}, arrVarNames);
        expect(result).toEqual(expectedResult);
    });

    it('generate text from values and conditions', () => {
        const values1 = {first_name: 'Some first name'};
        const expectedResult1 = "Hello Some first name!\n\nI just went through your profile and i would love to join your network!\n\nWhere do you work at the moment?\n\nJake\nSoftware Developer\njakelen1232@gmail.com";
        const result1 = getTextFromTemplate(testTemplate, values1, arrVarNames);
        expect(result1).toEqual(expectedResult1);

        const values2 = {first_name: 'Any other first name', company: "ACME Corp"};
        const expectedResult2 = "Hello Any other first name!\n\nI just went through your profile and i would love to join your network!\n\nI know you work at ACME Corp. But what is your role? :)\n\nJake\nSoftware Developer\njakelen1232@gmail.com";
        const result2 = getTextFromTemplate(testTemplate, values2, arrVarNames);
        expect(result2).toEqual(expectedResult2);

        const values3 = {first_name: 'Any other first name', company: "ACME Corp", position: "CEO"};
        const expectedResult3 = "Hello Any other first name!\n\nI just went through your profile and i would love to join your network!\n\nI know you work at ACME Corp as CEO :)\n\nJake\nSoftware Developer\njakelen1232@gmail.com";
        const result3 = getTextFromTemplate(testTemplate, values3, arrVarNames);
        expect(result3).toEqual(expectedResult3);
    });

    it('ignores empty and unused values', () => {
        const values1 = {first_name: 'Any other first name', company: "ACME Corp", position: "", unused_var:"", asdsads: ''};
        const expectedResult1 = "Hello Any other first name!\n\nI just went through {not_existing_var_name} your profile and i would love to join your network!\n\nI know you {not_eg_vaas__r_name}work at ACME Corp. But what is your role? :)\n\nJake\nSoftware {not_existing_vaas__r_name}}}{}Developer\njakelen1232@gmail.com";
        const result1 = getTextFromTemplate(testTemplateWithUnusedVars, values1, arrVarNames);
        expect(result1).toEqual(expectedResult1);
    });
});
