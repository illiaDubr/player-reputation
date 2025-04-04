import React from "react";

export const RoleContext = React.createContext(null);

export const RoleProvider = ({ children }) => {
    const [selectedRole, setSelectedRole] = React.useState("backer");

    return (
        <RoleContext.Provider value={{ selectedRole, setSelectedRole }}>
            {children}
        </RoleContext.Provider>
    );
};