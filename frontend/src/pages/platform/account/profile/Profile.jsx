import React from "react";
import {Helmet} from "react-helmet-async";
import {useForm} from "react-hook-form";
import Main from "../../../../components/main/Main.jsx";
import "../../../../style/platform/account/account.scss"
import IconSvg from "../../../../components/platform/components/IconSvg.jsx";
import {Context} from "../../../../api/store/storeContext.js";
import ProfileItem from "../../../../components/platform/section/account/profile/ProfileItem.jsx";

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
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            description: profile?.description || "",
            contact_name: profile?.contact_name || "",
            discord: profile?.discord || "",
        },
        mode: "onChange",
    });

    const toggleFieldEdit = (fieldName) => {
        setEditState(prev => ({...prev, [fieldName]: !prev[fieldName]}));
    };

    const handleToggleEdit = () => {
        setActiveBtn((prev) => !prev);
    };

    const handleSubmitFrom = (data) => {
        console.log(data);
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
                                <form method="PATCH" className="profile__item profile__left" onSubmit={handleSubmit(handleSubmitFrom)}
                                >
                                    <div className="profile__top">
                                        <IconSvg width={48} height={48} variant="funds"
                                                 id={profile.fund_for_search}/>
                                    </div>
                                    <ProfileItem
                                        name="description"
                                        register={register}
                                        title="Описание фонда:"
                                        value={profile.fundDescr || "Описание не указано"}
                                        placeholder="Введите описание"
                                        isActive={activeBtn}
                                        onToggle={() => toggleFieldEdit("fundDescr")}
                                        inputClass={editState.fundDescr ? "active" : ""}
                                        textClass={editState.fundDescr ? "" : "active"}
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
                                    />
                                </form>
                                <div className="profile__item profile__right">
                                </div>
                            </div>
                            <button type="button" className="btn" onClick={handleToggleEdit}>
                                Изменить
                            </button>
                        </>
                    )}
                </div>
            </Main>
        </>
    )
}

export default Profile;