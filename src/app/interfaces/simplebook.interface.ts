export interface SimpleBookFuse { // Descripcion de la interfaz para busqueda en FuseJs
    id: number;
    titulo: string;
    author: {
        firstName: string;
        lastName: string;
    };
    tags: string[];
}