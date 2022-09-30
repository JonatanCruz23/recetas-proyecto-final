export interface Receta {
    _id?:          string;
    nombre:        string;
    descripcion:   string;
    portada:       string;
    ingredientes:  Ingrediente[];
    pasos:         Paso[];
    estado?:       boolean;
    image?:        File;
    __v?:          number;
}
  
export interface Ingrediente {
    id:      number;
    nombre:  string;
    cantidad: number;
    unidad:   string;
    _id?:     string;
}
  
export interface Paso {
    _id?:        string;
    descripcion: string;
    numero:      number;
    id:          number
}