const dollarCA = Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
});

export function toCAD(num: number): string {
    return dollarCA.format(num);
}
