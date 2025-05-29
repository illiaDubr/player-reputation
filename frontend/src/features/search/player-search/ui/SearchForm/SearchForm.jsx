import React from "react";
import styles from "./SearchForm.module.scss";
import IconSvg from "@shared/ui/IconSvg/index.js";
import Button from "@shared/ui/SubmitButton";
import {FormProvider, useForm} from "react-hook-form";
import BasicSearchInput from "@features/search/player-search/ui/SearchForm/BasicSearchInput.jsx";
import AdvancedSearchFields from "@features/search/player-search/ui/SearchForm/AdvancedSearchFields.jsx";
import {yupResolver} from "@hookform/resolvers/yup";
import {advancedSchema, universalSchema} from "@features/search/player-search/ui/model/searchSchema.js";
import {useSearchStore} from "@app/providers";
import SearchModeSwitcher from "@features/search/player-search/ui/SearchModeSwitcher";

const SearchForm = ({checked, setChecked, fund_name}) => {
    const searchStore = useSearchStore();
    const [isAdvanced, setIsAdvanced] = React.useState(false);
    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(isAdvanced ? advancedSchema : universalSchema),
        shouldFocusError: false,
    });

    React.useEffect(() => {
        methods.reset();
    }, [isAdvanced, methods])

    const searchData = (data) => {
        if (checked) {
            return { ...data, fund_name };
        }
        return { ...data };
    };

    React.useEffect(() => {
        const data = methods.getValues();

        if (checked) {
            searchStore.search(searchData(data));
        } else if (!checked) {
            searchStore.setResults([]);
        }
    }, [checked, fund_name, methods, searchStore]);

    const onSubmit = async (data) => {
        await searchStore.search(searchData(data));
    };

    return (
        <search className={`${styles.search}`}>
            <div className={`${styles[`search__title`]}`}>
                Найдите нужного вам игрока
                <SearchModeSwitcher checked={checked} setChecked={setChecked}/>
            </div>
            <FormProvider {...methods}>
                <form method="POST" className={`${styles[`search__form`]}`} onSubmit={methods.handleSubmit(onSubmit)}>
                    {isAdvanced ? (
                        <AdvancedSearchFields methods={methods} />
                    ) :(
                        <BasicSearchInput methods={methods} />
                    )}
                    <Button>
                        Найти
                    </Button>
                </form>
            </FormProvider>
            <button className={`${styles[`search__swap`]} ${isAdvanced ? `${styles[`search__swap--active`]}` : ""}`} type="button" onClick={() => setIsAdvanced((v) => !v)}>
                {isAdvanced ? "Скрыть расширенный поиск" : "Расширенный поиск"}
                <span>
                    <IconSvg width={24} height={24} id="arrow"/>
                </span>
            </button>
        </search>
    )
}

export default SearchForm;