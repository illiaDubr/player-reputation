import React from "react";
import {Outlet} from "react-router-dom";
import BaseLayout from "@widgets/BaseLayout";
import Resize from "@shared/ui/Resize";
import BaseHeader from "@widgets/BaseHeader";
import {AdminNavigation} from "@widgets/BaseHeader/ui/Navigation/variants";

const AdminHeaderResponsive = () => {
    return (
        <Resize width={864} fallback={null}>
            <BaseHeader navList={<AdminNavigation />} />
        </Resize>
    )
};

React.useEffect(() => {
    document.body.classList.add('page-platform');
    return () => document.body.classList.remove('page-platform');
}, []);

const AdminLayout = () => {
    return (
        <BaseLayout className="main-platform" header={<AdminHeaderResponsive />}>
            <Outlet/>
        </BaseLayout>
    )
}

export default AdminLayout;