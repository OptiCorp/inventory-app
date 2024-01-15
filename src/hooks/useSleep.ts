const useSleep = () => {
    const Sleep = (ms: number) => {
        return new Promise((r) => setTimeout(r, ms));
    };

    return Sleep;
};

export default useSleep;
