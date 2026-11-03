export interface Product{
    productName:string,
    price:number,
    category:"Beauty"|"Health"|"Electronics"|"Apparel"|"Home"|"Others"
    description?:string,
    shipping:string,
    delivery?:string,
    returnPolicy?:string
}
export interface CreateProductRequest extends Product{
    storeId:number,
}
export interface UpdateProductRequest extends Partial<Product>{
}