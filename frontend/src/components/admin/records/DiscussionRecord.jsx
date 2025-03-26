import React from "react";
import {Context} from "../../../api/store/storeContext.js";
import RecordItem from "./RecordItem.jsx";

const DiscussionRecord = () => {
    const {store} = React.useContext(Context);
    const [discussionRecord, setDiscussionRecord] = React.useState([]);

    React.useEffect(() => {
        store.getDiscussionRecord().then((response) => {
            setDiscussionRecord(response.data.data);
        })
    })

    return (
        <div className="admin__wrap">
            <div className="admin__title">
                Записи на обсуждении
            </div>
            <RecordItem data={discussionRecord} discussion={false} closeRecord={true}/>
        </div>
    )
}

export default DiscussionRecord;