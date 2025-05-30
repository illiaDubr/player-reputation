const ShowIf = ({ value, hideWhen, children }) => {
    if (Array.isArray(hideWhen)) {
        return hideWhen.includes(value) ? null : children;
    }
    return value === hideWhen ? null : children;
};

export default ShowIf;