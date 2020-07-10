
export const createHttpRequest = (headers, data) => {
    return {
        headers: {
            ...headers,
        },
        data: {
            ...data,
        },
    };
};
