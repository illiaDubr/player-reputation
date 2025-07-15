import React from 'react';
import Modal from './Modal';
import {ModalProvider} from "@app/providers/index.jsx";
import modalDocs from './Modal.stories.mdx'

export default {
    title: 'shared/Modal',
    component: Modal,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <ModalProvider>
                <Story />
            </ModalProvider>

        ),
    ],
    parameters: {
        docs: {
            description: {
                component: modalDocs,
            },
        },
    },
};
