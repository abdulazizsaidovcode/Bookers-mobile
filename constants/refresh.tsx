export const handleRefresh = (setRefreshing: (val: boolean) => void) => {
    setRefreshing(true);
    setTimeout(() => {
        setRefreshing(false);
    }, 2000);
};
