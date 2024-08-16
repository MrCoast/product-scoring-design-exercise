export type Product = {
    id: number,
    name: string,
    type: string,
    weight: number,
    color: string,
    cost: number,
    attributes: ProductAttribute[],
};

export type ProductAttribute = {
    name: string,
    value: string,
};
