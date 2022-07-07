export class Cliente {
    
        Cedula:string;
        Nombre:string; 
        Apellido:string; 
        Telefono:string; 
        Domicilio:string;
        
        constructor(Cedula:string, Nombre:string, Apellido:string, Telefono:string, Domicilio:string){
            this.Cedula=Cedula;
            this.Nombre=Nombre;
            this.Apellido=Apellido;
            this.Telefono=Telefono;
            this.Domicilio=Domicilio;
        }
    
}