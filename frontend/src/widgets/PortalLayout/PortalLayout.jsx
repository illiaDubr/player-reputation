import React, {useContext} from 'react';
import {Outlet} from "react-router-dom";
import PortalHeader from "../PortalHeader";
//import styles from './PortalLayout.module.scss';
import {RoleContext, RoleProvider} from "@features/role-switcher/model";
import BaseLayout from "@widgets/BaseLayout";
import PortalFooter from "@widgets/PortalFooter";

const PortalLayoutContent = () => {
    const {selectedRole} = useContext(RoleContext);

    React.useEffect(() => {
        document.body.classList.add('page-home');
        return () => document.body.classList.remove('page-home');
    }, []);

    return (
        <BaseLayout className={`${selectedRole}`} header={<PortalHeader/>} footer={<PortalFooter/>}>
            <Outlet/>
        </BaseLayout>
    );
};

const PortalLayout = () => (
    <RoleProvider>
        <PortalLayoutContent/>
    </RoleProvider>
);

export default PortalLayout;