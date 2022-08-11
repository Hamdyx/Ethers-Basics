export const formatPrice = (price: number) => {
    return price
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatAddress = (add: string) => {
    const firstSec = add.slice(0, 5);
    const secondSec = add.slice(add.length - 8);
    return `${firstSec}....${secondSec}`;
};
