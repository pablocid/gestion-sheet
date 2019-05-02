export interface NectarinState {
    id: string;
    _id: string;
    especie: string;
    nombre_ingreso: string;
    ncv: string;
    pmg: string;
    status_interes: string;
    status: string;
    status_evaluativo: string;
    centro_evaluativo: INectarinCentroEvaluativo[];
    reference: string;
    schema: string;
    season: number;
    temporada: string;
}
export interface INectarinCentroEvaluativo {
    id: string;
    centro_evaluativo: string;
    portainjerto: string;
    ano_plantacion: number;
    conduccion: string;
    marco_plantacion: string;
    plantas_ha: 889;
    ramillas: INectarinRamillas[];
    fenologia: INectarinFenologia[];
    floribundidad: INectarinFloribundidad[];
    vigor: INectarinVigor[];
    raleo: INectarinRaleo[];
    fotos: INectarinFoto[];
    monitoreo_precosecha: INectarinMonitoreoPrecosecha[];
    observaciones: INectarinObservaciones[];
    conclusiones: INectarinConclusiones[];
    cosecha: INectarinCosecha[];
}
export interface INectarinRamillas {
    id: string;
    centro_evaluativo: string;
    valor: number;
}
export interface INectarinFenologia {
    id: string;
    centro_evaluativo: string;
    ifl: number;
    pfl: number;
}
export interface INectarinFloribundidad {
    id: string;
    centro_evaluativo: string;
    floribundidad: string;
    valor: number;
}
export interface INectarinVigor {
    id: string;
    centro_evaluativo: string;
    valor: string;
}
export interface INectarinRaleo {
    id: string;
    centro_evaluativo: string;
    momento_raleo: string;
    valor: number;
}
export interface INectarinFoto {
    id: string;
    centro_evaluativo: string;
    momento_foto: string;
    fecha_cosecha: string;
    fecha_salida_frio: string;
    descripcion_foto: string;
    nombre_foto: string;
}
export interface INectarinMonitoreoPrecosecha {
    id: string;
    centro_evaluativo: string;
    fecha_muestreo: number;
    ecuatorial1: number;
    ecuatorial2: number;
    hombro: number;
    sutura: number;
    punta: number;
}
export interface INectarinObservaciones {
    id: string;
    centro_evaluativo: string;
    tipo_observacion: string;
    fecha_observacion: number;
    observacion: string;
}
export interface INectarinConclusiones {
    id: string;
    centro_evaluativo: string;
    conclusiones: string;
}
export interface INectarinCosecha {
    id: string;
    centro_evaluativo: string;
    fecha_cosecha: number;
    frutos_cosechados: number;
    frutos_noexportables: number;
    apariencia_fruta: string;
    color_cubrimiento: string;
    porcentage_color: number;
    color_fondo: string;
    forma_fruto: string;
    vellosidad: string;
    simetria: string;
    textura: string;
    tipo_pulpa: string;
    color_pulpa: string;
    maduracion: string;
    adherencia_carozo: string;
    sabor: string;
    observaciones: string;
    cosecha_presiones: INectarinCosechaPresion[];
    cosecha_pesaje: INectarinCosechaPesaje[];
    cosecha_defectos: INectarinCosechaDefecto[];
    fotos: INectarinFoto[];
    postcosecha: INectarinPostcosecha[];
}
export interface INectarinCosechaPresion {
    id: string;
    centro_evaluativo: string;
    fecha_cosecha: number;
    ecuatorial1: number;
    ecuatorial2: number;
    hombro: number;
    sutura: number;
    punta: number;
    solidos_solubles: number;
    acidez: number;
}
export interface INectarinCosechaPesaje {
    id: string;
    centro_evaluativo: string;
    fecha: number;
    peso: number;
}
export interface INectarinCosechaDefecto {
    id: string;
    centro_evaluativo: string;
    fecha_cosecha: number;
    defectos: string;
    intensidad_defecto: string;
    n_frutos: number;
}
export interface INectarinPostcosecha {
    id: string;
    centro_evaluativo: string;
    fecha_cosecha: number;
    fecha_salida_frio: number;
    fecha_evaluacion: number;
    n_muestra: number;
    observaciones: string;
    postcosecha_defectos: INectarinPostcosechaDefecto[];
    postcosecha_presiones: INectarinPostcosechaPresion[];
    fotos: INectarinFoto[];
}
export interface INectarinPostcosechaDefecto {
    id: string;
    centro_evaluativo: string;
    fecha_cosecha: number;
    fecha_salida_frio: number;
    defectos: string;
    intensidad_defecto: string;
    frutos: number;
}
export interface INectarinPostcosechaPresion {
    id: string;
    centro_evaluativo: string;
    fecha_cosecha: number;
    fecha_salida_frio: number;
    ecuatorial1: number;
    ecuatorial2: number;
    hombro: number;
    sutura: number;
    punta: number;
    solidos_solubles: number;
    acidez: number;
}
