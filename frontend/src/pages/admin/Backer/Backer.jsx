import React from "react";
import {observer} from "mobx-react-lite";
import EntityListPage from "@pages/admin/ui";
import {useStore} from "@app/providers/index.jsx";


const Backer = observer(() => {
    const { store } = useStore();
    const [unApprovedBackers, setUnApprovedBackers] = React.useState([]);

    React.useEffect(() => {
        store.getUnApprovedBackers().then((response) => {
            setUnApprovedBackers(response.data);
        }).catch((error) => {
            console.error("Ошибка запроса:", error);
        });
    }, [store])

    console.log(unApprovedBackers);

    return (
        <EntityListPage
            title="Заявки на верификацию"
            getData={store => store.getUnApprovedBackers()}
            renderContent={(data, setData) => {
                const list = Array.isArray(data) ? data : (data?.data || []);

                console.log(data);
                return (
                    <div>
                        {list.length === 0 ? (
                            <p>Нет заявок</p>
                        ) : (
                            <ul>
                                {list.map((item) => (
                                    <li key={item.id}>
                                        {item.fund_name || 'Пусто'}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )
            }}
        />
    )
})

export default Backer;