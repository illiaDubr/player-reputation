import React from "react";

const addData = {
    last_name: "",
    first_name: "",
    middle_name: "",
    Email: "",
    Ggpokerok: "",
    Ggnetwork: "",
    Pokerstars_com: "",
    Pokerstars_es: "",
    Winamax_fr: "",
    Winamax_es: "",
    PS: "",
    GG: "",
    RedStar: "",
    TigerGaming: "",
    PartyPoker: "",
    Pokerstars: "",
    WPNpoker: "",
    Stretchpoker: "",
    Coinpoker: "",
    chikoPoker: "",
    nickiPoker: "",
    discord: "",
    comment: "",
}

const backerApprovalData = {

}

export const useAddPlayerData = () => {
    const [formBackerData, setFormBackerData] = React.useState(addData);

    return [formBackerData, setFormBackerData];
};

export const useBackerApprovalData = () => {
    const [formData, setFormData] = React.useState(backerApprovalData);

    return [formData, setFormData];
}

export const firstSlideDataPlayer = [
    { label: "Фамилия", id: "last_name", placeholder: "Введите фамилию", type: "text" },
    { label: "Имя", id: "first_name", placeholder: "Введите Имя", type: "text" },
    { label: "Отчество", id: "middle_name", placeholder: "Введите отчество", type: "text" },
    { label: "Ваш email", id: "Email", placeholder: "Введите email", type: "email" },
];

export const secSlideDataPlayer = [
    { label: "Ник на Ggpokerok", id: "Ggpokerok", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на Ggnetwork", id: "Ggnetwork", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на Pokerstars_com", id: "Pokerstars_com", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на Pokerstars_es", id: "Pokerstars_es", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на Winamax_fr", id: "Winamax_fr", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на Winamax_es", id: "Winamax_es", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на PS", id: "PS", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на 888poker", id: "888poker", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на GG", id: "GG", placeholder: "Введите Имя", type: "text" },
    { label: "Ник на RedStar", id: "RedStar", placeholder: "Введите Имя", type: "text" },
];

export const thirdSlideDataPlayer = [
    { label: "Ник на TigerGaming", id: "TigerGaming", placeholder: "Введите имя", type: "text" },
    { label: "Ник на PartyPoker", id: "PartyPoker", placeholder: "Введите имя", type: "text" },
    { label: "Ник на Pokerstars", id: "Pokerstars", placeholder: "Введите имя", type: "text" },
    { label: "Ник на WPNpoker", id: "WPNpoker", placeholder: "Введите имя", type: "text" },
    { label: "Ник на Coinpoker", id: "Coinpoker", placeholder: "Введите имя", type: "text" },
    { label: "Ник на chikoPoker", id: "chikoPoker", placeholder: "Введите имя", type: "text" },
    { label: "Ник на nickiPoker", id: "nickiPoker", placeholder: "Введите имя", type: "text" },
];

export const fourthSlideDataPlayer = [
    { label: "Skrill", id: "Skrill", placeholder: "Введите имя", type: "text" },
    { label: "Neteller", id: "Neteller", placeholder: "Введите имя", type: "text" },
    { label: "Gipsyteam", id: "GipsyTeam", placeholder: "Введите имя", type: "text" },
    { label: "Luxon", id: "Luxon", placeholder: "Введите имя", type: "text" },
    { label: "Telegram", id: "telegram", placeholder: "Введите имя", type: "text" },
    { label: "Discord", id: "discord", placeholder: "Введите имя", type: "text" },
];

export const fifthSlideDataPlayer = [
    { label: "Сумма ущерба", id: "damage", placeholder: "Введите сумму", type: "text" },
    { label: "Сумма мейкапа", id: "makeUp", placeholder: "Введите сумму", type: "text" },
]

export const markData = [
    { name: "Арбитраж", value: "arbitrage" },
    { name: "Мульти арбитраж", value: "MultiArbitrage" },
    { name: "Проблемный игрок", value: "ProblematicPlayer" },
    { name: "Игрок на паузе", value: "PlayerOnPause" },
    { name: "Нет метки", value: "no tag" },
]

export const firstSlideDataBacker = [
    { label: "Название Фонда", id: "1", placeholder: "Введите название", type: "text" },
    { label: "Ссылка на сайт", id: "2", placeholder: "Введите ссылку на сайт", type: "text" },
    { label: "Ссылка на гостевой домик в Discord", id: "3", placeholder: "Введите ссылку на Discord", type: "text" },
    { label: "Контакт представителя в Discord", id: "4", placeholder: "Введите контакт", type: "text" },
]

export const test2 = [
    { label: "Сколько у вас тренеров", id: "1", placeholder: "Введите количество", type: "text" },
    { label: "Количество игроков в команде", id: "2", placeholder: "Введите количество", type: "text" },
]