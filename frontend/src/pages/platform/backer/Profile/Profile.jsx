import React from "react";
import {Helmet} from "react-helmet-async";
import "./Profile.scss"
import {useForm} from "react-hook-form";
import IconSvg from "@shared/ui/IconSvg/index.js";
import ProfileItem from "./ProfileItem";
import {useStore} from "@app/providers/index.jsx";

const Profile = () => {
    const {store} = useStore();
    const profile = store.user?.backer;
    const [activeBtn, setActiveBtn] = React.useState(false);
    const [editState, setEditState] = React.useState({
        fundDescr: false,
        contactName: false,
        discord: false,
    });

    const {
        register,
        //handleSubmit,
        formState: { errors, isDirty },
    } = useForm({
        mode: 'onChange',
    });

    const toggleFieldEdit = (fieldName) => {
        setEditState(prev => ({...prev, [fieldName]: !prev[fieldName]}));
    };

    const handleToggleEdit = () => {
        setActiveBtn((prev) => !prev);
    };

    return (
        <>
            <Helmet>
                <title>
                    Профиль
                </title>
            </Helmet>
            <div className="profile__box">
                {profile && (
                    <>
                        <div className="profile">
                            <form method="PATCH" className={`profile__item profile__left ${isDirty ? "profile__item--active" : ""}`}>
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
                        </div>
                        <button type="button" className="btn" onClick={handleToggleEdit}>
                            {activeBtn ? "Скрыть" : "Изменить"}
                        </button>
                    </>
                )}
            </div>
        </>
    )
}

export default Profile;