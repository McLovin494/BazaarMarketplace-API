export interface RegisterRequest{
    name:string,
    email:string,
    password:string

}
export interface RegisterCustomer extends RegisterRequest{}
export interface RegisterSeller extends RegisterRequest{}
export interface RegisterSeller extends RegisterRequest{}
export interface LoginRequest{
    email:string,
    password:string
}