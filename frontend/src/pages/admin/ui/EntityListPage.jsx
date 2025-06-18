import React from "react";
import {Helmet} from "react-helmet-async";
import {observer} from "mobx-react-lite";
import {useStore} from "@app/providers/index.jsx";

const EntityListPage = observer(({
                                     title = "",
                                     getData,
                                     renderContent,
                                     initialData = [],
                                 }) => {
    const {store} = useStore();
    const [data, setData] = React.useState(initialData);

    React.useEffect(() => {
        let mounted = true;
        getData(store)
            .then((response) => {
                if (mounted) setData(response.data);
            })
            .catch((error) => {
                console.error("Ошибка запроса:", error);
            });
        return () => {
            mounted = false
        };
    }, [store, getData]);

    console.log(data);

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {renderContent(data, setData)}
        </>
    );
});

export default EntityListPage;