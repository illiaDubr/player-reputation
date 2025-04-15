import React from "react";
import {Helmet} from "react-helmet-async";
import {useForm} from "react-hook-form";
import Main from "../../../../components/main/Main.jsx";
import "../../../../style/platform/account/account.scss"
import IconSvg from "../../../../components/platform/components/IconSvg.jsx";
import {Context} from "../../../../api/store/storeContext.js";
import ProfileItem from "../../../../components/platform/section/account/profile/ProfileItem.jsx";
import {yupResolver} from "@hookform/resolvers/yup";
import {ProfileSchema} from "../../../../components/platform/components/validation/ProfileSchema.js";

const Profile = () => {
    const {store} = React.useContext(Context);
    const profile = store.user?.backer;
    const [activeBtn, setActiveBtn] = React.useState(false);
    const [editState, setEditState] = React.useState({
        fundDescr: false,
        contactName: false,
        discord: false,
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(ProfileSchema),
    });

    const toggleFieldEdit = (fieldName) => {
        setEditState(prev => ({...prev, [fieldName]: !prev[fieldName]}));
    };

    const handleToggleEdit = () => {
        setActiveBtn((prev) => !prev);
    };

    console.log(profile);

    const handleSubmitFrom = (data, e) => {
        e.preventDefault();
        const profileData = {
            ...Object.fromEntries(Object.entries(data).filter(([, value]) => value !== "")),
            id: profile.backer_id,
        };

        console.log(profileData);
        store.profile(profileData);
    }

    return (
        <>
            <Helmet>
                <title>
                    Профиль
                </title>
            </Helmet>
            <Main secClassName="profile__wrap" secID="profile">
                <div className="profile__box">
                    {profile && (
                        <>
                            <div className="profile">
                                <form method="PATCH" className={`profile__item profile__left ${isDirty ? "profile__item--active" : ""}`} onSubmit={handleSubmit(handleSubmitFrom)}>
                                    <div className="profile__top">
                                        <IconSvg width={48} height={48} variant="funds"
                                                 id={profile.fund_for_search}/>
                                    </div>
                                    <ProfileItem
                                        name="description"
                                        register={register}
                                        title="Описание фонда:"
                                        value={profile.description || "Описание не указано"}
                                        placeholder="Введите описание"
                                        isActive={activeBtn}
                                        onToggle={() => toggleFieldEdit("fundDescr")}
                                        inputClass={editState.fundDescr ? "active" : ""}
                                        textClass={editState.fundDescr ? "" : "active"}
                                        errors={errors}
                                        as="textarea"
                                    />
                                    <ProfileItem
                                        name="contact_name"
                                        register={register}
                                        title="ФИО главного контактного лица:"
                                        value={profile.contact_name || "Контактное лицо не указано"}
                                        placeholder="Введите контакт"
                                        isActive={activeBtn}
                                        onToggle={() => toggleFieldEdit("contactName")}
                                        inputClass={editState.contactName ? "active" : ""}
                                        textClass={editState.contactName ? "" : "active"}
                                        errors={errors}
                                    />
                                    <ProfileItem
                                        name="discord"
                                        register={register}
                                        title="Дискорд для связи:"
                                        value={profile.discord || "Discord не указан"}
                                        placeholder="Введите Discord"
                                        isActive={activeBtn}
                                        onToggle={() => toggleFieldEdit("discord")}
                                        inputClass={editState.discord ? "active" : ""}
                                        textClass={editState.discord ? "" : "active"}
                                        errors={errors}
                                    />
                                    <button type="submit" className={`btn ${isDirty ? "btn--active" : ""}`}>
                                        Изменить
                                    </button>
                                </form>
                                {/*
                                <div className="profile__item profile__right">
                                    <div className="profile__field">
                                        <div className="profile__title">

                                        </div>
                                    </div>
                                </div>
                                */}
                            </div>
                            <button type="button" className="btn" onClick={handleToggleEdit}>
                                {activeBtn ? "Скрыть" : "Изменить"}
                            </button>
                        </>
                    )}
                </div>
            </Main>
        </>
    )
}

export default Profile;