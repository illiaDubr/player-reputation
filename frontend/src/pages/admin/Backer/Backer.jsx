import React from "react";
import {observer} from "mobx-react-lite";
import EntityListPage from "@pages/admin/ui";
import {useStore} from "@app/providers/index.jsx";

const Backer = observer(() => {
    const { store } = useStore();
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        store.getUnApprovedBackers().then((response) => {
            setData(response.data.data);
        }).catch((error) => {
            console.error("Ошибка запроса:", error);
        });
    }, [store])

    console.log(data);

    return (
        <EntityListPage
            title="Заявки на верификацию"
            getData={store => store.getApprovedBackers()}
            renderContent={(data, setData) => null}
        />
    )
})

export default Backer;