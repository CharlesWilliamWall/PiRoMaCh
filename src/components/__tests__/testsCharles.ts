import type Promo from "@/interfaces/Promo";
import type { Item } from "@/interfaces/Item";

export function isPromo(item: Item, promos: Promo[]): boolean {
    let isPromo = false;
    if (!item && !promos) {
        throw new Error("No item and no promos provided");
    }
    if (!item) {
        throw new Error("No item provided");
    }
    if (!promos) {
        throw new Error("No promos provided");
    }
    promos.forEach((promo: Promo) => {
        if (promo.objectID == item.objectID) {
            isPromo = true;
        }
    });
    return isPromo;
}
