import React, {FunctionComponent, useState} from 'react';
import {Template} from "../MessageTemplateEditor/MessageTemplateEditor";
import {Flex} from "../../../ui/flex/Flex";
import {Overlay} from "../../../ui/overlay/Overlay";
import {ErrorButton} from "../../../ui/buttons/ErrorButton/ErrorButton";
import {Textarea} from "../../../ui/textareas/Textarea/Textarea";
import {Variables} from "../MessageTemplateEditor/MessageTemplateEditor.utils";
import {Input} from "../../../ui/inputs/Input/Input";
import {PrimaryButton} from "../../../ui/buttons/PrimaryButton/PrimaryButton";
import {getTextFromTemplate} from "../MessageTemplateEditor/utils/getTextFromTemplate";


export type MessagePreviewProps = {
    arrVarNames: Array<string>;
    template: Template;
    onClose: (e: React.SyntheticEvent) => void;
}
//нет времени добавлять троттлинг
//на моем компе работает без лагов
//учитывая объем данных (размер шаблона), тормозить не будет нигде, рендер текста занимает меньше 16мс (1 кадр из 60)
//при больших нагрузках и в иных добавил бы троттлинг с помощью сторонней бесплатной библиотеки
export const MessagePreview: FunctionComponent<MessagePreviewProps> = ({arrVarNames, template, onClose}) => {

    const [values, setValues] = useState<Variables>({});
    const onChangeValue = (variable: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValues = {...values};
        newValues[variable] = e.target.value;
        setValues(newValues);
    };
    const text = getTextFromTemplate(template, values, arrVarNames);

  return <Overlay>
      <Flex width={'600px'} height={'auto'} background={'white'} margin={'40px 0'}>
          <Flex container alignItems={"center"} justifyContent={"space-between"}>
              <Flex width={'28px'}/>
              <Flex container justifyContent={'center'}>Message Preview</Flex>
              <Flex width={'28px'}>
                  <ErrorButton onClick={onClose}>X</ErrorButton>
              </Flex>
          </Flex>
          <Flex minHeight={'320px'} alignItems={'stretch'} container>
              <Textarea value={text} onChange={() => {}}></Textarea>
          </Flex>
          <Flex container flexWrap={"wrap"}>
              {arrVarNames.map((arrVarName, index) => {
                  return <Flex key={index} margin={'10px 20px'}>
                      <Input description={arrVarName} onChange={onChangeValue(arrVarName)} />
                  </Flex>
              })}
          </Flex>
          <Flex width={'100%'} container justifyContent={'center'}>

              <PrimaryButton onClick={onClose}>Close</PrimaryButton>
          </Flex>
      </Flex>
  </Overlay>
};