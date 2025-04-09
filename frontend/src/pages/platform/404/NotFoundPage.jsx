import React from "react";
import {Context} from "../../../api/store/storeContext.js";
import IconSvg from "../../../components/platform/components/IconSvg.jsx";

const NotFoundPage = () => {
    const {store} = React.useContext(Context);
    const [loadingProgress, setLoadingProgress] = React.useState(0);
    const intervalRef = React.useRef(null);
    const maxHeight = 340;


    React.useEffect(() => {
        if (store.isLoading) {
            setLoadingProgress(0);
            intervalRef.current = setInterval(() => {
                setLoadingProgress((prev) => {
                    if (prev < maxHeight) {
                        return prev + 5;
                    }
                    return maxHeight;
                });
            }, 50);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            setLoadingProgress(maxHeight);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [store.isLoading]);


    if (store.isLoading) {
        return <div className="loading__wrap">
            <div className="loading__box" style={{height: `${loadingProgress}px`, transition: "all 0.05s ease-in-out", backgroundColor: "#fff"}}>
                <IconSvg width={590} height={340} id="loading__logo" />
            </div>
        </div>;
    }

    return (
        <h1>
            404 Not Found
        </h1>
    );
};

export default NotFoundPage;