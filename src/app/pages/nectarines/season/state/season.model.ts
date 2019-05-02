
import { ID } from '@datorama/akita';

export interface Season {
  id: ID;
  schema: string;
  temporada: string;
  season: number;
  updated: Date;
  especie: string;
  mainPic: string;
  varlist: {id: string, ncv: string}[];
}

export function createSeason(params: Partial<Season>) {
  return {
    ...params
  } as Season;
}
