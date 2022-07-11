export interface ProductoI {
    IDFactVenta:number,
    IDProducto:number, 
    Producto:string, 
    Imagen:any, 
    Precio:number, 
    Stock:number

}

export interface ProductoFactI{
    IDFactura:number,
    Producto:string, 
    Cantidad:number,
    Precio:number
    
}