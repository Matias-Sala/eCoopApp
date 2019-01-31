import { Direccion } from './direccion';
import { Pago } from './pago';

export interface Persona {

    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    familiares: Persona[];
    direccion: Direccion;
    pagos: Pago[];

}
