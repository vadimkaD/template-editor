import React, {useState, useCallback} from 'react';

import {MessageEditorButtonBlock} from "./core/components/MessageEditorButtonBlock/MessageEditorButtonBlock";
import {MessageTemplateEditor, Template} from "./core/components/MessageTemplateEditor/MessageTemplateEditor";
import {ID} from "./core/components/MessageTemplateEditor/MessageTemplateEditor.utils";

const templateTest: Template = {
    body: ['Начальная строка', 'Завершающая строка'],
    id: 'main',
    conditions: [{
        expression: '{firstname}',
        then: {
            id: 'firstname',
            body: ['firstname then body1', 'firstname then body2'],
            conditions: [{
                expression: '{lastname}',
                then: {
                    id: 'lastname_b4',
                    body: ['lastname then body'],
                    conditions: [],
                },
                else: {
                    id: 'lastname_after',
                    body: ['lastname else body'],
                    conditions: []
                }
            }]
        },
        else: {
            id: 'lastname',
            body: ['firstname else body'],
            conditions: []
        }
    }]
};

const empty = {
    id: ID(),
    body: ['первая половинавторая половинатретья половина'],
    conditions: []
};

function App() {


    const [visible, setVisible] = useState<boolean>(false);
    const onShow = useCallback(() => setVisible(true), [setVisible]);

    return (
        visible
            ? <MessageTemplateEditor template={empty} arrVarNames={['first_name', 'last_name', 'company', 'position']} />
            : <MessageEditorButtonBlock onClick={onShow} />
    );
}

export default App;
