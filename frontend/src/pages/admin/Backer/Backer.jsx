import React from "react";
import {observer} from "mobx-react-lite";
import AdminListPage from "@pages/admin/ui/AdminListPage";
import BackerItemList from "@pages/admin/Backer/ui/BackerItemList/index.js";

const Backer = observer(() => {
    return (
        <AdminListPage
            title="Заявки на верификацию"
            getData={store => store.getUnApprovedBackers()}
            renderContent={(data, setData) => (
                <BackerItemList data={data} approvedControl={true}/>
            )}
        />
    )
})

export default Backer;