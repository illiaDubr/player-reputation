import React from "react";

const RenderUnless = ({ value, hideWhen, children }) => {
    return value === hideWhen ? null : children;
};

export default RenderUnless;