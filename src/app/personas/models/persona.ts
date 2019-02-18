import { Direccion } from './direccion';
import { Pago } from './pago';
import { Padre } from './post/PadrePost';

export interface Persona {

    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    familiares: Persona[];
    direccion: Direccion;
    pagos: Pago[];

}

export const ToPadre = (persona: Persona) => {
    const padre: Padre = {
        nombre: persona.nombre,
        apellido: persona.apellido,
        telefono: persona.telefono,
        direccion: persona.direccion
    };
    return padre;
};

