
export interface Pago {

    id: number;
    concepto: string;
    cuota: number;
    valor: number;
    fecha: string;
}

export interface PagoPost {

    conceptoId: number;
    cuota: number;
    valor: number;
    personaId: number;

}
