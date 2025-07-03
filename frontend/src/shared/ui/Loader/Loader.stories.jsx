import React from "react";
import Loader from "./Loader.jsx";


export default {
    title: "Shared/Loader",
    component: Loader,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
Loader — универсальный компонент отображения индикатора загрузки.

Используется для показа процесса загрузки или ожидания данных в интерфейсе. 
Поддерживает настройку размера (в пикселях) и передачу дополнительного класса для кастомизации стилей.

**Пример использования:**
\`\`\`jsx
<Loader />
<Loader size={80} />
<Loader className="loader--active" />
\`\`\`

Обычно применяется как временная заглушка вместо контента на время загрузки данных.
                `
            }
        }
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 150 }}>
                <Story />
            </div>
        ),
    ],
    argTypes: {
        className: { control: 'text', description: 'Дополнительный класс для кастомизации' },
        size: { control: 'number', description: 'Размер лоадера (px)' },
    },
};

const Template = (args) => <Loader {...args} />;

export const Default = Template.bind({});
Default.args = {
    className: "loader--active",
};

export const CustomSize = Template.bind({});
CustomSize.args = {
    size: 80,
    className: "loader--active",
};
