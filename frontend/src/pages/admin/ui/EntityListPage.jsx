import React from "react";
import { Helmet } from "react-helmet-async";
import { observer } from "mobx-react-lite";
import { useStore } from "@app/providers/index.jsx";

const EntityListPage = observer(({
                                     title = "",
                                     getData,
                                     renderContent,
                                 }) => {
    const { store } = useStore();
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        let mounted = true;

        getData(store).then((response) => {
                console.log('RESPONSE:', response);
                if (!response || !response.data) return;
                if (mounted) setData(response.data);
            })
            .catch((error) => {
                console.error("Ошибка запроса:", error);
            });

        return () => {
            mounted = false;
        };
    }, [store, getData]);

    console.log(data);

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {data.length === 0 ? <div>Загрузка...</div> : renderContent(data, setData)}
        </>
    );
});

export default EntityListPage;