import React from "react";
import {observer} from "mobx-react-lite";
import AdminListPage from "@pages/admin/ui/AdminListPage";


const Backer = observer(() => {


    return (
        <AdminListPage
            title="Заявки на верификацию"
            getData={store => store.getUnApprovedBackers()}
            renderContent={(data, setData) => {
                const list = Array.isArray(data) ? data : (data?.data || []);
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