import * as yup from 'yup';
import {NameData} from "@features/search/player-search/ui/config/NameData.js";

export const universalSchema = yup.object().shape({
    universal: yup
        .string()
        .min(4, "Минимум 4 символа")
        .required("Это поле обязательно")
        .test(
            "not-only-name",
            "Введите более специфичный запрос, только имени недостаточно",
            (value) => {
                if (!value) return false;
                const v = value.trim().toLowerCase();
                return !NameData.includes(v);
            }
        ),
});

export const advancedSchema = yup.object().shape({
    last_name: yup
        .string()
        .test(
            "not-in-name-data",
            "Поле содержит недопустимое имя",
            (value) => {
                if (!value) return true;
                return !NameData.includes(value.toLowerCase());
            }
        )
        .when(["discord", "nickname"], {
            is: (discord, nickname) =>
                (!discord || discord.trim().length <= 4) &&
                (!nickname || nickname.trim().length <= 4),
            then: (schema) =>
                schema.required("Заполните хотя бы одно из полей: Фамилия, Discord или Ник в руме (не менее 3 символов)"),
        }),
    first_name: yup.string(),
    middle_name: yup.string(),
    discord: yup.string(),
    nickname: yup.string(),
    Email: yup.string(),
});