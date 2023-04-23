export interface Item {
    objectID: number;
    primaryImage: string;
    primaryImageSmall: string;
    additionalImages: Array<string>;
    department: string;
    objectName: string;
    title: string;
    culture: string;
    period: string;
    artistDisplayName: string;
    artistDisplayBio: string;
    objectDate: string;
    objectEndDate: number;
    medium: string;
    dimensions: string;
    classification: string;
    objectURL: string;
    rating: number;
    price: number;
    tags: Array<string>;
    quantity?: number;
}

export type ShortItem = Partial<Item>; // partial to have  Id and qty

export interface ItemInvoice {
    objectID: number;
    title: string;
    artistDisplayName: string;
    quantity: string;
    price: number;
    subtotal: number;
}

// export interface ShortItem {
//     objectID: number;
//     quantity?: number;
// }
