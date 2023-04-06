import { test, expect } from "Vitest";
import type { Item } from "@/interfaces/Item";
import type Promo from "@/interfaces/Promo";
import { isPromo } from "./testsCharles";

test("Sanity Test", () => {
    expect(true).toBe(true);
});

test("isPromo returns false if item is not in promos", () => {
    const item: Item = {
        objectID: 1,
        primaryImage: "test",
        primaryImageSmall: "test",
        additionalImages: ["test", "test"],
        department: "test",
        objectName: "test",
        title: "test",
        culture: "test",
        period: "test",
        artistDisplayName: "test",
        artistDisplayBio: "test",
        objectDate: "test",
        objectEndDate: 2,
        medium: "test",
        dimensions: "test",
        classification: "test",
        objectURL: "test",
        rating: 1,
        price: 1,
        tags: ["test", "test"],
        quantity: 1,
    };
    const promos: Promo = {
        objectID: 2,
        discount: 10,
        dateStart: new Date("December 17, 1995 03:24:00"),
        dateEnd: new Date("December 17, 1995 03:24:00"),
    };
    expect(isPromo(item, [promos])).toBe(false);
});

test("isPromo returns true if item is in promos", () => {
    const item: Item = {
        objectID: 1,
        primaryImage: "test",
        primaryImageSmall: "test",
        additionalImages: ["test", "test"],
        department: "test",
        objectName: "test",
        title: "test",
        culture: "test",
        period: "test",
        artistDisplayName: "test",
        artistDisplayBio: "test",
        objectDate: "test",
        objectEndDate: 2,
        medium: "test",
        dimensions: "test",
        classification: "test",
        objectURL: "test",
        rating: 1,
        price: 1,
        tags: ["test", "test"],
        quantity: 1,
    };
    const promos: Promo = {
        objectID: 1,
        discount: 10,
        dateStart: new Date("December 17, 1995 03:24:00"),
        dateEnd: new Date("December 17, 1995 03:24:00"),
    };
    expect(isPromo(item, [promos])).toBe(true);
});

test("isPromo throws error if no item is provided", () => {
    const promos: Promo = {
        objectID: 1,
        discount: 10,
        dateStart: new Date("December 17, 1995 03:24:00"),
        dateEnd: new Date("December 17, 1995 03:24:00"),
    };
    expect(() => isPromo(undefined, [promos])).toThrowError("No item provided");
});

test("isPromo throws error if no promos are provided", () => {
    const item: Item = {
        objectID: 1,
        primaryImage: "test",
        primaryImageSmall: "test",
        additionalImages: ["test", "test"],
        department: "test",
        objectName: "test",
        title: "test",
        culture: "test",
        period: "test",
        artistDisplayName: "test",
        artistDisplayBio: "test",
        objectDate: "test",
        objectEndDate: 2,
        medium: "test",
        dimensions: "test",
        classification: "test",
        objectURL: "test",
        rating: 1,
        price: 1,
        tags: ["test", "test"],
        quantity: 1,
    };
    const promos: Promo = {
        objectID: 1,
        discount: 10,
        dateStart: new Date("December 17, 1995 03:24:00"),
    };
    expect(() => isPromo(item, undefined)).toThrowError("No promos provided");
});

test("isPromo throws error if no item and no promos are provided", () => {
    expect(() => isPromo(undefined, undefined)).toThrowError("No item and no promos provided");
});
