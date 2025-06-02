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

const AdminLayout = () => {
    return (
        <BaseLayout header={<AdminHeaderResponsive />}>
            <Outlet/>
        </BaseLayout>
    )
}

export default AdminLayout;