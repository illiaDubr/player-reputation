import SlideContentWrap from "@features/UnifiedBackerData/ui/layout/index.js";
import Input from "@shared/ui/Input/index.jsx";
import {BackerSetupData} from "@features/UnifiedBackerData/ui/config/BackerSetupData.js";
import {Controller} from "react-hook-form";
import AppSelect from "@shared/ui/Select/index.js";
import {backerTags} from "@shared/config/backerTags.js";

const backerTagOptions = Object.entries(backerTags).map(([key, value]) => ({
    value: key,
    name: value.name
}));


const UnifiedBackerData = (origin, methods) => {
    const { register, formState: { errors } } = methods;

    switch (origin) {
        case "create":
            return [
                {
                    id: 1,
                    content: (
                        <SlideContentWrap title="Личная информация">
                            {BackerSetupData.INFO.map((item, index) => (
                                <Input
                                    key={index}
                                    label={item.label}
                                    type={item.type}
                                    placeholder={item.placeholder}
                                    {...register(item.name)}
                                    error={errors[item.name]}
                                />
                            ))}
                        </SlideContentWrap>
                    )
                },
                {
                    id: 2,
                    content: (
                        <SlideContentWrap title="Ники в румах">
                            {BackerSetupData.NICKNAMES.map((item, index) => (
                                <Input
                                    key={index}
                                    label={item.label}
                                    type={item.type}
                                    placeholder={item.placeholder}
                                    {...register(item.name)}
                                />
                            ))}
                        </SlideContentWrap>
                    )
                },
                {
                    id: 3,
                    content: (
                        <SlideContentWrap title="Контактная информация">
                            {BackerSetupData.SOCIAL.map((item, index) => (
                                <Input
                                    key={index}
                                    label={item.label}
                                    type={item.type}
                                    placeholder={item.placeholder}
                                    {...register(item.name)}
                                />
                            ))}
                        </SlideContentWrap>
                    )
                },
                {
                    id: 4,
                    content: (
                        <>
                            <SlideContentWrap title="Развернутый комментарий">
                                <Input
                                    customInput
                                    label="Сумма ущерба"
                                    placeholder="Введите сумму"
                                    type="number"
                                    {...register("damage")}
                                />
                                <Input
                                    customInput
                                    label="Сумма мейкапа"
                                    placeholder="Введите сумму"
                                    type="number"
                                    {...register("makeUp")}
                                />
                            </SlideContentWrap>
                            <Controller name="backer_tag" control={methods.control} render={({ field }) => (
                                <AppSelect
                                    {...field}
                                    rawOptions={backerTagOptions}
                                    labelKey="name"
                                    valueKey="value"
                                    title="Маркер*"
                                    placeholder="Выберите метку"
                                    error={errors.backer_tag}
                                />
                            )}/>
                            <Input
                                as="textarea"
                                label="Ваш развернутый комментарий по сложившейся ситуации*"
                                {...register("comment")}
                                error={errors.comment}
                            />
                        </>
                    )
                },
            ];
        case "setup":
            return [
                {
                    id: 1,
                    content: (
                        <SlideContentWrap>
                            {BackerSetupData.BACKER_INFO.map((item, index) => (
                                <Input
                                    key={index}
                                    label={item.label}
                                    type={item.type}
                                    placeholder={item.placeholder}
                                    {...register(item.name)}
                                    error={errors[item.name]}
                                />
                            ))}
                        </SlideContentWrap>
                    )
                },
                {
                    id: 2,
                    content: (
                        <>
                            <SlideContentWrap>
                                <Input
                                    label="Сколько у вас тренеров"
                                    type="text"
                                    placeholder="Введите количество"
                                    {...register("numberCoach")}
                                />
                                <Input
                                    label="Количество игроков в команде"
                                    type="text"
                                    placeholder="Введите количество"
                                    {...register("numberPlayer")}
                                />
                            </SlideContentWrap>
                            <Controller name="rollbackIncrease" control={methods.control} render={({field}) => (
                                    <Input
                                        as="radio"
                                        label="Возможность увеличить свой откат"
                                        options={BackerSetupData.ROLLBACK}
                                        {...field}
                                    />
                                )}/>
                            <Controller name="rakeback" control={methods.control} render={({field}) => (
                                    <Input
                                        as="radio"
                                        label="Рейкбек"
                                        options={BackerSetupData.RAKEBACK}
                                        {...field}
                                    />
                                )}/>
                            <Controller name="discipline" control={methods.control} render={({ field }) => (
                                <AppSelect
                                    {...field}
                                    rawOptions={BackerSetupData.DISCIPLINE}
                                    labelKey="label"
                                    valueKey="value"
                                    title="Дисциплина*"
                                    placeholder="Выберите дисциплину"
                                    error={errors.discipline}
                                />
                            )}/>
                        </>
                    )
                },
                {
                    id: 3,
                    content: (
                        <>
                            <Input
                                as="textarea"
                                label="Информация о фонде"
                                {...register("comment")}
                                placeholder="Информация будет использоваться на сайте PR в раздела о вашем фонде. В будущем вы сможете скорректировать инфорацию в личном кабинете"
                            />
                        </>
                    )
                },
            ];
    }
}

export default UnifiedBackerData;