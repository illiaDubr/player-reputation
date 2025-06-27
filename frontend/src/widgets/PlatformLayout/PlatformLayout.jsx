import React from "react";
import {Outlet} from "react-router-dom";
import BaseLayout from "@widgets/BaseLayout";
import BaseHeader from "@widgets/BaseHeader";
import {PlatformNavigation} from "@widgets/BaseHeader/ui/Navigation/variants";
import PlatformBreadcrumbs from "@widgets/PlatformBreadcrumbs/index.js";
import Resize from "@shared/ui/Resize/index.jsx";

const PlatformHeaderResponsive = () => {
    return (
        <Resize width={864} fallback={null}>
            <BaseHeader navList={<PlatformNavigation />} />
        </Resize>
    )
};

const PlatformLayout = () => {

    React.useEffect(() => {
        document.body.classList.add('page-platform');
        return () => document.body.classList.remove('page-platform');
    }, []);

    return (
        <BaseLayout className="main-platform" header={<PlatformHeaderResponsive />}>
            <PlatformBreadcrumbs />
            <Outlet/>
        </BaseLayout>
    )
}

export default PlatformLayout;