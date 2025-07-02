import React from "react";
import styles from "./AdminLayout.module.scss";
import {Outlet, useMatches} from "react-router-dom";
import BaseLayout from "@widgets/BaseLayout";
import Resize from "@shared/ui/Resize";
import BaseHeader from "@widgets/BaseHeader";
import {AdminNavigation} from "@widgets/BaseHeader/ui/Navigation/variants";

const AdminHeaderResponsive = () => {
    return (
        <Resize width={864} fallback={null}>
            <BaseHeader navList={<AdminNavigation/>}/>
        </Resize>
    )
};

const AdminLayout = () => {
    const matches = useMatches();

    React.useEffect(() => {
        document.body.classList.add('page-platform');
        return () => document.body.classList.remove('page-platform');
    }, []);

    const crumbs = matches.map((match, idx) => (
        <div className={styles[`admin__title`]} key={idx}>
            {match.handle?.breadcrumb}
        </div>
    ));

    return (
        <BaseLayout className="main-platform" header={<AdminHeaderResponsive/>}>
            <div className={styles[`admin__container`]}>
                {crumbs}
                <Outlet/>
            </div>
        </BaseLayout>
    )
}

export default AdminLayout;