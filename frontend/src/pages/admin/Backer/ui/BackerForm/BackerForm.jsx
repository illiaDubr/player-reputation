import React from "react";
import styles from "./BackerForm.module.scss";
import AppSelect from "@shared/ui/Select/index.js";
import {funds} from "@shared/config/funds.js";
import {Controller, useForm} from "react-hook-form";
import IconSvg from "@shared/ui/IconSvg/index.js";
import {useStore} from "@app/providers/index.jsx";

const fundsOptions = funds.map(fund => ({
    value: fund.fundName,
    name: fund.fundName,
}));


const BackerForm = ({backerId}) => {
    const { store } = useStore();
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

        const notApproved = {
            id: backerId,
            approved: "yes",
        }

        const fundData = {
            ...data,
            id: backerId,
        }

        try {
            await store.approvedBacker(approved);
            await store.changeFundBacker(fundData);
        } catch (error) {
            console.error("Ошибка:", error);
        }

        console.log(fundData, approved);
    }

    return (
        <form className={styles['backer_form-top']} onSubmit={handleSubmit(onSubmit)}>
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
                        className="admin__select"
                        isSearchable={true}
                    />
                )}/>
            <div className={styles['backer_form-btn--wrap']}>
                <button type="submit" className={styles[`backer_form-btn`]} disabled={!fund_for_search}>
                    <IconSvg width={16} height={16} id="check__mark" />
                    Одобрить верификацию
                </button>

                <button type="submit" className={styles[`backer_form-btn`]}>
                    <IconSvg width={16} height={16} id="close" />
                    Отклонить верификацию
                </button>
            </div>
        </form>
    )
}

export default BackerForm;