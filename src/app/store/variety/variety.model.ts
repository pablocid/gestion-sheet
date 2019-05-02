import { ID } from '@datorama/akita';

export interface Variety {
  id: ID;
  cultivar: string;
  especie: string;
  programa: string;
  temporada: string;
  status_evaluativo: string;
  centro_evaluativo: CentroEvaluativo[];
}

export interface CentroEvaluativo {
  ano_plantacion: number;
  fenologia: { inicio_floracion: string, plena_flor: string };
  floribundidad: { fc_ml: number; flores_ml: number };

}

export function createVariety(params: Partial<Variety>) {
  return {
    ...params
  } as Variety;
}
