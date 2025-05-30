import React, { useState, createContext } from 'react';

export const RoleContext = createContext(undefined);

export const RoleProvider = ({ children }) => {
    const [selectedRole, setSelectedRole] = useState('backer');

    return (
        <RoleContext.Provider value={{ selectedRole, setSelectedRole }}>
            {children}
        </RoleContext.Provider>
    );
};