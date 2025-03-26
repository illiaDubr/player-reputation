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
            <RecordItem data={discussionRecord} discussion={false}/>
        </div>
    )
}

export default DiscussionRecord;