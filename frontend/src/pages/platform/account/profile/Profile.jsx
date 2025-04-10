import React from "react";
import {Helmet} from "react-helmet-async";
import Main from "../../../../components/main/Main.jsx";
import "../../../../style/platform/account/account.scss"
import IconSvg from "../../../../components/platform/components/IconSvg.jsx";
import {Context} from "../../../../api/store/storeContext.js";
import AnimateHeight from "react-animate-height";

const Profile = () => {
    const {store} = React.useContext(Context);
    const profile = store.user?.backer;
    const [activeBtn, setActiveBtn] = React.useState(false);
    const [editState, setEditState] = React.useState({
        fundDescr: false,
        contactName: false,
        discord: false,
    });
    const toggleFieldEdit = (fieldName) => {
        setEditState(prev => ({...prev, [fieldName]: !prev[fieldName]}));
    };

    const handleToggleEdit = () => {
        setActiveBtn((prev) => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const formRef = React.useRef(null);
    const prevHeightRef = React.useRef(0);

    const [currentHeight, setCurrentHeight] = React.useState('auto');
    const [baseHeight, setBaseHeight] = React.useState(0);

    React.useEffect(() => {
        if (formRef.current) {
            const measuredHeight = formRef.current.getBoundingClientRect().height;
            if (prevHeightRef.current !== measuredHeight) {
                handleHeightChange(prevHeightRef.current, measuredHeight);
                prevHeightRef.current = measuredHeight;
            }
        }
    }, [editState, activeBtn]);

    function handleHeightChange(oldHeight, newHeight) {
        console.log(`Height changed from ${oldHeight} to ${newHeight}`);
        setBaseHeight(oldHeight);
        setCurrentHeight(newHeight);
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

                                <AnimateHeight height={editState ? currentHeight : baseHeight}>
                                    <form
                                        ref={formRef}
                                        method="PATCH"
                                        className="profile__item profile__left"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="profile__top">
                                            <IconSvg width={48} height={48} variant="funds"
                                                     id={profile.fund_for_search}/>
                                        </div>
                                        <div className="profile__field">
                                            <div className="profile__title">
                                                Описание фонда:
                                            </div>

                                            <div className="profile__content">
                                                <div className={`profile__text ${editState.fundDescr ? "" : "active"}`}>
                                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                                    accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                                                    illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                                                    explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                                                    odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                                                    voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
                                                    quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
                                                    eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                                                    voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
                                                    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                                                    Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
                                                    quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
                                                    voluptas nulla pariatur?
                                                    {/*{profile.fundDescr || "Описание не указано"}*/}
                                                </div>
                                                <input
                                                    className={`profile__input ${editState.fundDescr ? "active" : ""}`}
                                                    type="text"
                                                    placeholder="Введите описание"
                                                />
                                            </div>
                                            <button type="button"
                                                    onClick={() => toggleFieldEdit("fundDescr")}
                                                    className={`profile__edit-btn ${activeBtn ? "profile__edit-btn--active" : ""}`}>
                                                <IconSvg width={16} height={16} id="pen"/>
                                            </button>

                                        </div>
                                        <div className="profile__field">
                                            <div className="profile__title">
                                                ФИО главного контактного лица:
                                            </div>
                                            <div className="profile__content">
                                                <div
                                                    className={`profile__text ${editState.contactName ? "" : "active"}`}>
                                                    {profile.contact_name || "Контактное лицо не указано"}
                                                </div>
                                                <input
                                                    className={`profile__input ${editState.contactName ? "active" : ""}`}
                                                    type="text"
                                                    placeholder="Введите контакт"
                                                />
                                            </div>
                                            <button type="button"
                                                    onClick={() => toggleFieldEdit("contactName")}
                                                    className={`profile__edit-btn ${activeBtn ? "profile__edit-btn--active" : ""}`}>
                                                <IconSvg width={16} height={16} id="pen"/>
                                            </button>

                                        </div>
                                        <div className="profile__field">
                                            <div className="profile__title">
                                                Дискорд для связи:
                                            </div>

                                            <div className="profile__content">
                                                <div className={`profile__text ${editState.discord ? "" : "active"}`}>
                                                    {profile.discord || "Discord не указан"}
                                                </div>
                                                <input
                                                    className={`profile__input ${editState.discord ? "active" : ""}`}
                                                    type="text"
                                                    placeholder="Введите Discord"
                                                />
                                            </div>
                                            <button type="button"
                                                    onClick={() => toggleFieldEdit("discord")}
                                                    className={`profile__edit-btn ${activeBtn ? "profile__edit-btn--active" : ""}`}>
                                                <IconSvg width={16} height={16} id="pen"/>
                                            </button>

                                        </div>
                                    </form>
                                </AnimateHeight>

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