import { INectarinCosecha } from './state.interface';

export interface INectarinPrint {
    id: string;
    especie: string;
    cultivar: string;
    programa: string;
    temporada: string;
    status_evaluativo: string;
    centro_evaluativo: INectarinPrintCentroEvaluativo[];

}
export interface INectarinPrintCentroEvaluativo {
    name: string;
    porta_injerto: string;
    plantas_ha: number;
    ano_plantacion: number;
    marco_plantacion: string;
    inicio_cosecha: Date;
    fenologia: { inicio_floracion: Date, plena_flor: Date };
    numero_ramillas: number;
    post_raleo: number;
    main_pic: INectarinPrintPic;
    vigor: string;
    floribundidad: INectarinPrintFloribundidad;
    foto_floracion: INectarinPrintPic[];
    foto_cuaja: INectarinPrintPic[];
    foto_raleo: INectarinPrintPic[];
    cosecha: INectarinPrintCosecha[];
    rendimiento_total: number;
}

export interface INectarinPrintFloribundidad {
    flores_ml: number;
    fc_ml: number;
}

export interface INectarinPrintPic {
    url: string;
    thumbnail: string;
    description: string;
    momento: string;
}

export interface INectarinPrintCosecha {
    cosecha: INectarinCosecha;
    fecha: Date;
    forma: string;
    sobre_color: number;
    color_pulpa: string;
    color_cubrimiento: string;
    sabor: string;
    observaciones: string;
    peso_prom: number;
    calibre: string;
    calibres: number[];
    rendimiento: number;
    promedio_ecuatorial: number;
    punto_blando: { value: number, index: string };
    brix: number;
    acidez: number;
    defectos: INectarinPrintDefecto[];
    fotos: INectarinPrintPic[];
    fotos_defectos: INectarinPrintPic[];
    postcosecha: INectarinPrintPostcosecha[];
}

export interface INectarinPrintDefecto {
    value: number;
    id: string;
    not: string;
    label: string;
    position: number;
}

export interface INectarinPrintPostcosecha {
    fecha_salida: Date;
    fecha_evaluacion: Date;
    shelflife: number;
    dias: number;
    muestras: number;
    defectos: INectarinPrintDefecto[];
    promedio_ecuatorial: number;
    punto_blando: { value: number, index: string };
    brix: number;
    acidez: number;
    fotos: INectarinPrintPic[];
    observaciones: string;
}
