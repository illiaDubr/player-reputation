import React from "react";
import styles from "./ResultItemActionsForm.module.scss";
import {FormProvider, useForm} from "react-hook-form";
import Button from "@shared/ui/SubmitButton";
import Forms from "@features/search/player-search/ui/SearchResult/ui/ResultItemList/ui/ResultItemActionsForm/ui";
import {useModal, useSearchStore} from "@app/providers";
import {reportSchema} from "@features/search/player-search/ui/SearchResult/ui/ResultItemList/ui/ResultItemActionsForm/model/formSchema.js";
import {yupResolver} from "@hookform/resolvers/yup";

const ResultItemActionsForm = ({origin, player, backerId}) => {
    const searchStore = useSearchStore();
    const {openModal} = useModal();

    let defaultValues = {};
    if (origin === "edit") {
        defaultValues = {
            backer_tag: player?.backer_tag ?? "",
            damage: player?.damage ?? "",
            comment: player?.comment ?? "",
        };
    } else if (origin === "report") {
        defaultValues = {
            comment: "",
        };
    }
    const methods = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: origin === "edit"
            ? undefined
            : yupResolver(reportSchema),
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const actionLabel = origin === "edit" ? "Изменить" : "Отправить";
    const resultModal = origin === "edit" ? "Edit" : "Report";

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            let actionPayload;
            if (origin === "edit") {
                actionPayload = {
                    ...data,
                    player_id: player.player_id,
                    id: player.reputation_records?.[0]?.id,
                    makeUp: 0,
                }
                await searchStore.playerEdit(actionPayload);
            } else if (origin === "report") {
                actionPayload = {
                    ...data,
                    id: backerId,
                    player_id: player.player_id,
                    backer_tag: player.backer_tag,
                }
                await searchStore.report(actionPayload);
            }
            openModal('Result', {origin: resultModal});
        } catch (e) {
            methods.setError('root', { message: e?.message || "Ошибка запроса" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <form className={styles[`actions__form`]} onSubmit={methods.handleSubmit(onSubmit)}>
                <Forms origin={origin} methods={methods} />
                <Button isLoading={isLoading}>
                    {actionLabel}
                </Button>
            </form>
        </FormProvider>
    )
}

export default ResultItemActionsForm;