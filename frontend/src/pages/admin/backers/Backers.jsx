import React from "react";
import {observer} from "mobx-react-lite";
import AdminMain from "../../../components/admin/AdminMain.jsx";
import {Context} from "../../../api/store/storeContext.js";
import BackersForm from "../../../components/admin/backers/BackersForm.jsx";
import BackersItem from "../../../components/admin/backers/BackersItem.jsx";

const Backers = observer(() => {
    const {store} = React.useContext(Context);
    const [unApprovedBackers, setUnApprovedBackers] = React.useState([]);

    React.useEffect(() => {
        store.getUnApprovedBackers().then((response) => {
            setUnApprovedBackers(response.data.data);
        }).catch((error) => {
            console.error("Ошибка запроса:", error);
        });
    }, [store])

    console.log(unApprovedBackers);

    const hasContent = (value) => value !== undefined && value !== null && value !== "";

    return (
        <AdminMain pageTitle="Заявки на верефикацию">
            <div className="admin__wrap">
                {unApprovedBackers.map((item, index) => (
                    <div className="admin__box" key={index}>
                        <div className="record backer">
                            <div className="record__top">
                                <div className="">
                                </div>
                                <div className="record__form-wrap">
                                    <BackersForm />
                                </div>
                            </div>
                            <div className="backer__wrap">
                                {
                                    [
                                        { title: "Email:", content: item.email },
                                        { title: "Описание фонда:", content: item.fundDescr, className: "fundDescr", },
                                        { title: "Ссылка на сайт:", content: item.siteLink },
                                        { title: "Гостевой домик в Discord:", content: item.discordHouse },
                                        { title: "Контакт представителя в Discord:", content: item.discordRepresentative },
                                        { title: "Количество тренеров:", content: item.numberCoach },
                                        { title: "Количество игроков:", content: item.numberPlayer },
                                        { title: "Рейкбек:", content: item.rakeback },
                                    ]
                                        .filter(pair => hasContent(pair.content))
                                        .map((pair, idx) => (
                                            <BackersItem
                                                key={idx}
                                                title={pair.title}
                                                content={pair.content}
                                                className={pair.className}
                                            />
                                        ))
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AdminMain>
    )
})

export default Backers;