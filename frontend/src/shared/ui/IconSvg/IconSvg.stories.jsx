import React from 'react';
import IconSvg from './IconSvg';

export default {
    title: 'Shared/IconSvg',
    component: IconSvg,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
Компонент **IconSvg** используется для отображения SVG-иконок из спрайтов. 
Поддерживает подстановку разных спрайтов (основной, фондовый и др.), 
кастомизацию размера.

**Пропсы:**
- \`id\` (string) — id иконки в спрайте (например, 'close', 'user', 'fund').
- \`width\` (number|string) — ширина иконки (px, rem, em, %, и др.).
- \`height\` (number|string) — высота иконки.
- \`variant\` (string, опционально) — какой спрайт использовать ('funds' — с иконками фондов, по умолчанию — основной).

### Пример использования:
\`\`\`jsx
<IconSvg id="close" width={24} height={24} />
<IconSvg id="fund" width={20} height={20} variant="funds" />
\`\`\`
        `
            }
        }
    },
    argTypes: {
        id: { control: 'text', description: 'ID иконки в спрайте' },
        width: { control: 'text', description: 'Ширина иконки' },
        height: { control: 'text', description: 'Высота иконки' },
        variant: { control: 'text', description: 'Вариант спрайта' }
    }
};

const Template = (args) => <IconSvg {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: 'notification',
    width: '32',
    height: '32',
};

export const FundsIcon = Template.bind({});
FundsIcon.args = {
    id: 'Bzik17',
    width: '98',
    height: '98',
    variant: 'funds'
};