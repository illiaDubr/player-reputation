import React from "react";
import Input from "@shared/ui/Input/index.jsx";

const BasicSearchInput = ({methods}) => {
    const { register, formState: { errors } } = methods;

    return (
        <Input
            label="Введите данные игрока"
            {...register("universal")}
            error={errors.universal}
        />
    )
}

export default BasicSearchInput;