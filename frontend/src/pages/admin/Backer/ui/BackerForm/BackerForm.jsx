import React from "react";
import AppSelect from "@shared/ui/Select/index.js";
import {funds} from "@shared/config/funds.js";
import {Controller, useForm} from "react-hook-form";
import IconSvg from "@shared/ui/IconSvg/index.js";

const fundsOptions = funds.map(fund => ({
    value: fund.id,
    name: fund.fundName,
}));


const BackerForm = ({backerId}) => {
    const {
        control,
        watch,
        handleSubmit,
    } = useForm({
        mode: 'onChange',
    });

    const fund_for_search = watch("fund_for_search");

    const onSubmit = async (data) => {
        const approved = {
            id: backerId,
            approved: "yes",
        }

        const fundData = {
            ...data,
            id: backerId,
        }

        console.log(fundData, approved);
    }

    return (
        <form className="" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="fund_for_search"
                control={control}
                render={({field}) => (
                    <AppSelect
                        {...field}
                        labelKey="name"
                        valueKey="value"
                        rawOptions={fundsOptions}
                        placeholder="Выберите фонд"
                    />
                )}/>
            <button type="submit" className="record__btn" disabled={!fund_for_search}>
                <IconSvg width={16} height={16} id="check__mark" />
                Одобрить верификацию
            </button>
        </form>
    )
}

export default BackerForm;