import React, {useState, useCallback} from 'react';

import {MessageEditorButtonBlock} from "./core/components/MessageEditorButtonBlock/MessageEditorButtonBlock";
import {MessageTemplateEditor, Template} from "./core/components/MessageTemplateEditor/MessageTemplateEditor";


// const empty: Template = {
//     id: ID(),
//     body: ['первая половинавторая половинатретья половина'],
//     conditions: []
// };

//сорямба, на анимации не осталось времени

function App() {

    const [template, setTemplate] = useState<Template | undefined>(undefined);
    const [arrVarNames, setArrVarNames] = useState<Array<string>>(['first_name', 'last_name', 'company', 'position']);
    const [visible, setVisibleEditor] = useState<boolean>(false);
    const onShowEditor = useCallback(() => {
        const arrVarNames: Array<string> = localStorage.arrVarNames ? JSON.parse(localStorage.arrVarNames) : ['first_name', 'last_name', 'company', 'position'];
        const template: Template = localStorage.template ? JSON.parse(localStorage.template) : undefined;
        setTemplate(template);
        setArrVarNames(arrVarNames);
        setVisibleEditor(true);
    }, [setVisibleEditor, setTemplate, setArrVarNames]);
    const onHideEditor = useCallback((e: React.SyntheticEvent) => setVisibleEditor(false), [setVisibleEditor]);
    const onSaveTemplate = useCallback((template: Template, arrVarNames: Array<string>) => {
        localStorage.setItem('arrVarNames', JSON.stringify(arrVarNames));
        localStorage.setItem('template', JSON.stringify(template));
    }, []);

    return (
        visible
            ? <MessageTemplateEditor template={template} arrVarNames={arrVarNames} onHideEditor={onHideEditor} onSaveTemplate={onSaveTemplate} />
            : <MessageEditorButtonBlock onClick={onShowEditor} />
    );
}

export default App;
