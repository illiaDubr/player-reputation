import React from "react";
import {observer} from "mobx-react-lite";
import EntityListPage from "@pages/admin/ui";

const Backer = observer(() => {
    return (
        <EntityListPage
            title="Заявки на верификацию"
            getData={store => store.getApprovedBackers()}
            renderContent={(data, setData) => null}
        />
    )
})

export default Backer;