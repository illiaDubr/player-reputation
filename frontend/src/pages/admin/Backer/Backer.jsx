import React from "react";
import {observer} from "mobx-react-lite";
import AdminListPage from "@pages/admin/ui/AdminListPage";


const Backer = observer(() => {


    return (
        <AdminListPage
            title="Заявки на верификацию"
            getData={store => store.getUnApprovedBackers()}
            renderContent={(data, setData) => (
                <div>
                    {data.length === 0 ? (
                        <p>Нет заявок</p>
                    ) : (
                        <ul>
                            {data.map((item) => (
                                <li key={item.id}>
                                    {item.fund_name || 'Пусто'}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        />
    )
})

export default Backer;