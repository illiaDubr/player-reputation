import React from "react";
import {Context} from "../../../api/store/storeContext.js";
import RecordItemList from "./RecordItemList.jsx";

const DiscussionRecord = () => {
    const {store} = React.useContext(Context);
    const [discussionRecord, setDiscussionRecord] = React.useState([]);

    React.useEffect(() => {
        store.getDiscussionRecord().then((response) => {
            setDiscussionRecord(response.data.data);
        }).catch((error) => {
            console.error("Ошибка запроса:", error);
        });
    }, [store]);

    return (
        <div className="admin__wrap">
            <div className="admin__title">
                Записи на обсуждении
            </div>
            <RecordItemList data={discussionRecord} discussion={false} closeRecord={true}/>
        </div>
    )
}

export default DiscussionRecord;