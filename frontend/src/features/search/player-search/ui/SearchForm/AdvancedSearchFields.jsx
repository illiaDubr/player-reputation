import React from "react";
import Input from "@shared/ui/Input/index.jsx";
import {SearchData} from "@features/search/player-search/ui/config/SearchData.js";
import styles from "./SearchForm.module.scss";

const AdvancedSearchFields = ({methods}) => {
    const { register, formState: { errors } } = methods;

    return (
        <div className={`${styles[`fields__wrap`]}`}>
            {SearchData.SEARCH.map((item, index) => (
                <Input
                    key={index}
                    label={item.label}
                    placeholder={item.placeholder}
                    {...register(item.name)}
                    error={errors[item.name]}
                />
            ))}
        </div>
    )
}

export default AdvancedSearchFields;