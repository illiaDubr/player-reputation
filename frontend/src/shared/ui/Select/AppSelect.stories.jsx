import React from "react";
import AppSelect from "./AppSelect";
import { useForm, Controller } from "react-hook-form";

export default {
    title: "Shared/AppSelect",
    component: AppSelect,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
**AppSelect** — выпадающий селект для выбора значения, совместим с react-hook-form.
 
Используется для выбора одного значения из списка (например, категорий, тегов, статусов).
  Компонент поддерживает работу как в самостоятельном режиме, так и в связке с react-hook-form через компонент Controller.
  Позволяет настраивать отображаемое название (title), плейсхолдер, показывать ошибку валидации, включать режим поиска по опциям.
 
  ##Основные возможности
- Кастомизация вариантов через rawOptions
- Работа с form state через react-hook-form
- Отображение ошибок и сообщений
- Поиск по списку значений (опционально)
                `
            }
        }
    },
    argTypes: {
        value: { control: "text" },
        isSearchable: { control: "boolean" },
        title: { control: "text" },
        placeholder: { control: "text" },
        error: { control: "text" },
    },
};

const options = [
    { label: "Пункт 1", value: "one" },
    { label: "Пункт 2", value: "two" },
    { label: "Пункт 3", value: "three" },
    { label: "Пункт 4", value: "four" },
];

const Template = (args) => <AppSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
    rawOptions: options,
    title: "Выберите пункт",
    value: "",
};

export const WithError = Template.bind({});
WithError.args = {
    rawOptions: options,
    title: "Ошибка",
    value: "",
    error: "Обязательное поле",
};

export const WithReactHookForm = () => {
    const methods = useForm({
        defaultValues: { backer_tag: "" }
    });

    const { control, handleSubmit, formState: { errors } } = methods;

    const onSubmit = (data) => {
        alert(JSON.stringify(data, null, 2));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: 300 }}>
            <Controller
                name="backer_tag"
                control={control}
                rules={{ required: "Выберите метку" }}
                render={({ field }) => (
                    <AppSelect
                        {...field}
                        rawOptions={options}
                        labelKey="label"
                        valueKey="value"
                        placeholder="Выберите метку"
                        title="Смена метки"
                        error={errors.backer_tag?.message}
                    />
                )}
            />
        </form>
    );
};
WithReactHookForm.storyName = "Интеграция с react-hook-form";