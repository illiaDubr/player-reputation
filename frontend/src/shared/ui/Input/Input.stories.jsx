import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from './Input';

export default {
    title: 'Shared/Input',
    component: Input,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
**Input** — универсальный компонент поля ввода.  
Работает с обычными текстовыми полями, textarea, кастомными инпутами (например, только числа с \$), радио-группами.  
Полностью совместим с react-hook-form (через Controller).

#### Основные пропсы:
- \`as\` — 'input', 'textarea', 'radio' (тип поля)
- \`label\` — подпись над полем
- \`error\` — текст ошибки/объект от RHF
- \`customInput\` — если true, оборачивает поле в div, можно добавить кастомную логику (например, только числа)
- \`options\` — массив опций для radio
- \`className\` — доп. классы
- \`...field\` — остальные пропсы (например, \`name\`, \`value\`, \`onChange\` и т.д.)

#### Примеры использования:

\`\`\`jsx
<Input label="Имя" />
<Input as="textarea" label="Описание" />
<Input as="radio" label="Выберите роль" options={[{label: "A", value: "a"}]} />
<Input customInput label="Сумма" />
\`\`\`

##### В связке с react-hook-form:
\`\`\`jsx
<Controller
  name="amount"
  control={control}
  render={({ field, fieldState }) => (
    <Input {...field} label="Сумма" error={fieldState.error?.message} />
  )}
/>
\`\`\`
        `
            }
        }
    }
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: "Стандартный инпут",
    placeholder: 'Введите значение'
};

export const WithError = Template.bind({});
WithError.args = {
    label: 'С ошибкой',
    placeholder: 'Ошибка ввода',
    error: 'Обязательное поле'
};

export const Textarea = Template.bind({});
Textarea.args = {
    as: 'textarea',
    label: 'Textarea',
    placeholder: 'Введите длинный текст'
};

export const CustomInput = Template.bind({});
CustomInput.args = {
    label: 'Только цифры',
    customInput: true,
    placeholder: 'Введите сумму'
};

export const Radio = Template.bind({});
Radio.args = {
    as: 'radio',
    label: 'Выберите опцию',
    options: [
        { label: 'Первый', value: 'one' },
        { label: 'Второй', value: 'two' }
    ],
    name: 'radio_example',
    value: 'one',
};