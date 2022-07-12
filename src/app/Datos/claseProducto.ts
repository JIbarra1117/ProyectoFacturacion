export interface ProductoI {
    IDFactVenta:number,
    IDProducto:number, 
    Producto:string, 
    Imagen:any, 
    Precio:number, 
    Stock:number

}

export interface ProductoFactI{
    IDProducto:number,
    IDFactVenta:number,
    IDFactura:number,
    Producto:string, 
    Cantidad:number,
    Precio:number
    
}