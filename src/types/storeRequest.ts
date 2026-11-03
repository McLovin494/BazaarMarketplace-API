export   interface StoreRequest {
    storeName:string,
    description:string,
    location:string

}
export interface StoreUpdateRequest extends Partial<StoreRequest>{}