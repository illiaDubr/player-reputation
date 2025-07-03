import React from "react";
import {MemoryRouter} from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useSpring } from "@react-spring/web";
import {StoreProvider} from "@app/providers";

const DummyProvider = (Story) => (
    <StoreProvider>
        <Story />
    </StoreProvider>
);

const RouterDecorator = (Story) => (
    <MemoryRouter>
       <div style={{background: 'black', height: '44px', borderRadius: '10px'}}>
           <Story />
       </div>
    </MemoryRouter>
);

export default {
    title: "Shared/LogoutBtn",
    component: LogoutBtn,
    decorators: [DummyProvider, RouterDecorator],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
**LogoutBtn** — кнопка выхода из аккаунта для навигации или пользовательских меню.

Использует анимированные иконки (через react-spring) и кастомные стили.
При нажатии вызывает функцию выхода пользователя из приложения, затем перенаправляет на главную страницу портала.

> Кнопка может отображаться с анимацией иконки и текста либо без неё.   
> Поддерживает дополнительный класс через \`className\`.

**Пример:**
\`\`\`jsx
<LogoutBtn />
<LogoutBtn iconAnimation={iconAnimation} textAnimation={textAnimation} />
\`\`\`
                `
            }
        }
    },
    argTypes: {
        className: { control: 'text', description: 'Дополнительный CSS-класс' },
        iconAnimation: { control: false, description: 'Анимация для иконки (react-spring)' },
        textAnimation: { control: false, description: 'Анимация для текста (react-spring)' }
    },
};

const Template = (args) => <LogoutBtn {...args} />;

export const Default = (args) => {
    const iconAnimation = useSpring({
        left: '15px',
        from: { left: '35px' },
    });
    const textAnimation = useSpring({
        opacity: 1,
        left: '45px',
        from: { opacity: 0, left: '200px' },
    });
    return <LogoutBtn {...args} iconAnimation={iconAnimation} textAnimation={textAnimation} />;
};
Default.storyName = 'Default';

export const WithAnimations = (args) => {
    const iconAnimation = useSpring({
        left: '15px',
        loop: { reverse: true },
        from: { left: '35px' },
    });
    const textAnimation = useSpring({
        opacity: 1,
        left: '45px',
        loop: { reverse: true },
        from: { opacity: 0, left: '200px' },
    });
    return <LogoutBtn {...args} iconAnimation={iconAnimation} textAnimation={textAnimation} />;
};
WithAnimations.storyName = 'With Animations';