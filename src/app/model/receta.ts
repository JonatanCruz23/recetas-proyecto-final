export interface Receta {
    _id?:          string;
    nombre:        string;
    descripcion:   string;
    portada:       string;
    ingredientes: Ingrediente[];
    pasos:        Paso[];
    estado?:       boolean;
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
    descripcion: string;
    _id?:         string;
    numero:      number;
    id:          number
  }