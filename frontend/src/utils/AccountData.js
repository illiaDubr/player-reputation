import React from "react";

export const addData = {
    last_name: "",
    first_name: "",
    middle_name: "",
    Email: "",
    Pokerstars_com: "",
    Ggpokerok: "",
    Winamax_es: "",
    RedStar: "",
    TigerGaming: "",
    PartyPoker: "",
    Pokerstars_es: "",
    //888poker: "",
    WPNpoker: "",
    Stretchpoker: "",
    Coinpoker: "",
    chikoPoker: "",
}

export const useAddPlayerData = () => {
    const [formData, setFormData] = React.useState(addData);

    return [formData, setFormData];
};

export const firstSlideDataPlayer = [
    { label: "Фамилия", id: "last_name", placeholder: "Введите фамилию", type: "text" },
    { label: "Имя", id: "first_name", placeholder: "Введите Имя", type: "text" },
    { label: "Отчество", id: "middle_name", placeholder: "Введите отчество", type: "text" },
    { label: "Ваш email", id: "Email", placeholder: "Введите email", type: "email" },
];

export const secSlideDataPlayer = [
    { label: "Ник на Pokerstars", id: "Pokerstars_com", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на GGpoker", id: "Ggpokerok", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на Winamax", id: "Winamax_es", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на RedStar", id: "RedStar", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на TigerGaming", id: "TigerGaming", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на PartyPoker", id: "PartyPoker", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на Pokerstars.es", id: "Pokerstars_es", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на 888poker", id: "888poker", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на WPNpoker", id: "WPNpoker", placeholder: "Введите Имя", type: "text" },
];

export const thirdSlideDataPlayer = [
    { label: "Ник на Coinpoker", id: "Coinpoker", placeholder: "Введите имя", type: "text" },
    { label: "Ник на ChicoPoker", id: "chikoPoker", placeholder: "Введите имя", type: "text" },
];

export const fourthSlideDataPlayer = [
    { label: "Skrill", id: "Skrill", placeholder: "Введите имя", type: "text" },
    { label: "Neteller", id: "Neteller", placeholder: "Введите имя", type: "text" },
    { label: "Gipsyteam", id: "GipsyTeam", placeholder: "Введите имя", type: "text" },
    { label: "Luxon", id: "Luxon", placeholder: "Введите имя", type: "text" },
    { label: "Telegram", id: "telegram", placeholder: "Введите имя", type: "text" },
];