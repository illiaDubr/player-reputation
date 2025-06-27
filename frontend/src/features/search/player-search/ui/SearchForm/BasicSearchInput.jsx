import React from "react";
import Input from "@shared/ui/Input/index.jsx";

const BasicSearchInput = ({methods}) => {
    const { register, formState: { errors } } = methods;

    return (
        <Input
            label="Введите данные игрока"
            {...register("universal")}
            placeholder="Введите любую контактную информацию"
            error={errors.universal}
        />
    )
}

export default BasicSearchInput;