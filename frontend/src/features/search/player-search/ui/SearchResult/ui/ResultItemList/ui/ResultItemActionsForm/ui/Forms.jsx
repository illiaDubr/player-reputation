import Input from "@shared/ui/Input";
import {Controller} from "react-hook-form";
import AppSelect from "@shared/ui/Select";
import {backerTags} from "@shared/config/backerTags.js";

const backerTagOptions = Object.entries(backerTags).map(([key, value]) => ({
    value: key,
    name: value.name
}));

const Forms = ({origin, methods}) => {
    const {register, formState: {errors} = {}} = methods || {};

    switch (origin) {
        case "edit":
            return (
                <>
                    <Controller name="backer_tag" control={methods.control} render={({field}) => (
                        <AppSelect
                            {...field}
                            rawOptions={backerTagOptions}
                            labelKey="name"
                            valueKey="value"
                            placeholder="Выберите метку"
                            title="Смена метки"
                        />
                    )}/>
                    <Input
                        customInput
                        label="Сумма ущерба"
                        {...register("damage")}
                        placeholder="Введите сумму"
                    />
                    <Input
                        as="textarea"
                        label="Ваш развернутый комментарий по сложившейся ситуации"
                        {...register("comment")}
                    />
                </>
            );
        case "report":
            return (
                <>
                    <Input
                        as="textarea"
                        label="Ваш развернутый комментарий по сложившейся ситуации"
                        {...register("comment")}
                        error={errors?.comment}
                    />
                </>
            );
    }
}

export default Forms;