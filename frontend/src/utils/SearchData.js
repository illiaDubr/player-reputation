import React from "react";

export const SearchData = {
    last_name: "",
    first_name: "",
    middle_name: "",
    discord: "",
    Email: "",
    nickname: "",
    phonenumber: "",
};

export const useSearchFormData = () => {
    const [formData, setFormData] = React.useState(SearchData);

    return [formData, setFormData];
};

export const SearchFields = [
    { label: "Фамилия", id: "surname", name: "last_name", placeholder: "Введите фамилию" },
    { label: "Имя", id: "name", name: "first_name", placeholder: "Введите имя" },
    { label: "Отчество", id: "middle_name", name: "middle_name", placeholder: "Введите отчество" },
    { label: "Discord", id: "discord", name: "discord", placeholder: "Введите ник игрока" },
    { label: "Почта", id: "Email", name: "Email", placeholder: "Введите почту игрока" },
    { label: "Ник в руме", id: "nickname", name: "nickname", placeholder: "Введите ник игрока" },
];

export const backerTagConfig = {
    arbitrage: {text: "Арбитраж", color: "red"},
    MultiArbitrage: {text: "Мульти арбитраж", color: "orange"},
    ProblematicPlayer: {text: "Проблемный игрок", color: "yellow"},
    PlayerOnPause: {text: "Игрок на паузе", color: "green"},
    ExArbitrage: {text: "Экс Арбитраж", color: "gray"},
    default: {text: "Нет метки", color: "gray"},
};

export const dynamicFields = [
    {key: "Ggpokerok", label: "Ggpokerok:"},
    {key: "Ggnetwork", label: "Ggnetwork:"},
    {key: "Pokerstars_com", label: "Pokerstars_com:"},
    {key: "Pokerstars_es", label: "Pokerstars_es:"},
    {key: "Winamax_fr", label: "Winamax_fr:"},
    {key: "Winamax_es", label: "Winamax_es:"},
    {key: "PS", label: "PS:"},
    {key: "GG", label: "GG:"},
    {key: "RedStar", label: "RedStar:"},
    {key: "TigerGaming", label: "TigerGaming:"},
    {key: "PartyPoker", label: "PartyPoker:"},
    {key: "Pokerstars", label: "Pokerstars:"},
    {key: "888poker", label: "888poker:"},
    {key: "WPNpoker", label: "WPNpoker:"},
    {key: "Stretchpoker", label: "Stretchpoker:"},
    {key: "Coinpoker", label: "Coinpoker:"},
    {key: "chikoPoker", label: "chikoPoker:"},
    {key: "nickiPoker", label: "nickiPoker:"},
];