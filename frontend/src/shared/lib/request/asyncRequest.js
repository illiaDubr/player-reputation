export const handleError = (error, defaultMessage, setError) => {
    const message = error?.response?.data?.message || defaultMessage;
    console.error(message);
    if (typeof setError === "function") {
        setError(message);
    }
};

export const request = async ({
                                  asyncFn,
                                  defaultMessage,
                                  setLoading,
                                  setError,
                                  onSuccess,
                              }) => {
    if (setLoading) setLoading(true);
    try {
        const response = await asyncFn();
        if (typeof onSuccess === "function") {
            onSuccess(response);
        }
        return response;
    } catch (error) {
        handleError(error, defaultMessage, setError);
        throw error;
    } finally {
        if (setLoading) setLoading(false);
    }
};