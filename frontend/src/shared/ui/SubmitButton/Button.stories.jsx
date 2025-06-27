import React from "react";
import Button from "./Button";

/**
 * Button — кастомная кнопка для любых пользовательских действий и отправки форм.
 * Поддерживает разные типы, позволяет задавать ширину (через пропс maxWidth), а также отображать состояние загрузки (isLoading).
 * Контент кнопки передаётся через children.
 * Может использоваться для любых интерактивных сценариев, в том числе как основная кнопка отправки формы.
 */

export default {
    title: "Shared/Button",
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        isLoading: { control: "boolean" },
        maxWidth: { control: "number" },
        type: { control: "radio", options: ["button", "submit", "reset"] },
        children: { control: "text" },
    },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = { children: "Отправить", isLoading: false, maxWidth: 250, type: "submit" };

export const Loading = Template.bind({});
Loading.args = { children: "Отправить", isLoading: true, maxWidth: 250, type: "submit" };

export const CustomWidth = Template.bind({});
CustomWidth.args = { children: "Широкая кнопка", isLoading: false, maxWidth: 400 };