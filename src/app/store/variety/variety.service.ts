import { Injectable } from '@angular/core';
import { VarietyStore } from './variety.store';
import { StitchService } from 'src/app/services/stitch/stitch.service';

@Injectable({ providedIn: 'root' })
export class VarietyService {

  constructor(
    private varietyStore: VarietyStore,
    private stitch: StitchService
  ) {
  }

  async syncOne(_id: string) {
    this.varietyStore.setLoading(true);
    // tslint:disable-next-line:max-line-length
    // const result = await this.stitch.client.callFunction('lambdatest', ['https://docs.google.com/spreadsheets/d/1rzcXFPl_HAJ5Ny7HnzWOoKOFZf_K1pIirCtZ59A_KZQ/edit#gid=835473242']);
    const result = await this.stitch.client.callFunction('getSeasonData', [_id]);
    this.varietyStore.set([result]);
    this.varietyStore.setLoading(false);
  }

  setLoading(value: boolean) {
    this.varietyStore.setLoading(value);
  }

}
