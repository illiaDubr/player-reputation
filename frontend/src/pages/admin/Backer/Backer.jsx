import React from "react";
import {observer} from "mobx-react-lite";
import EntityListPage from "@pages/admin/ui";

const Backer = observer(() => {
    return (
        <EntityListPage
            title="Заявки на верификацию"
            getData={store => store.getUnApprovedBackers()}
            renderContent={(data, setData) => (
                {data}
            )}
        />
    )
})

export default Backer;