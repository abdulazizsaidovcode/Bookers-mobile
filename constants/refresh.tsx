export const handleRefresh = (setRefreshing: (val: boolean) => void) => {
    setRefreshing(true);
    setTimeout(() => {
        setRefreshing(false);
    }, 1500);
};
