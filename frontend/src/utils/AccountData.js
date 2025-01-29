import React from "react";

export const addData = {
    last_name: "",
    first_name: "",
    middle_name: "",
    Email: "",
}

export const useAddPlayerData = () => {
    const [formData, setFormData] = React.useState(addData);

    return [formData, setFormData];
};

export const firstSlideData = [
    { label: "Фамилия", id: "last_name", placeholder: "Введите фамилию", type: "text" },
    { label: "Имя", id: "first_name", placeholder: "Введите Имя", type: "text" },
    { label: "Отчество", id: "middle_name", placeholder: "Введите отчество", type: "text" },
    { label: "Ваш email", id: "Email", placeholder: "Введите email", type: "email" },
];

export const secSlideData = [
    { label: "Ник на Pokerstars", placeholder: "Введите Имя", type: "text" },
    { label: "Почта регистрации на GGpoker", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на GGpoker", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на Winamax", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на RedStar", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на TigerGaming", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на PartyPoker", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на Pokerstars.es", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на 888poker", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на WPNpoker", placeholder: "Введите Имя", type: "text" },
];