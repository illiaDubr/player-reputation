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
