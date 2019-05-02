import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { StitchService } from 'src/app/services/stitch/stitch.service';
import { SeasonStore } from './season.store';
import { syncfunctionName } from 'src/app/values/config';

@Injectable({ providedIn: 'root' })
export class SeasonService {
  constructor(
    private seasonsStore: SeasonStore,
    private stitch: StitchService
  ) {
  }

  setActive(id: ID) {
    this.seasonsStore.setActive(id);
  }

  async get() {
    const response = await this.stitch.imageList();
    console.log(response);
    const data = await this.stitch.client.callFunction('getSeasons', ['Nectarines', 'temporada']);
    this.seasonsStore.set(data);
    return true;
  }

  async syncData(_id: string) {
    this.seasonsStore.setLoading(true);
    let error = false;
    try {
      await this.stitch.lambda(syncfunctionName, { _id });
    } catch (e) {
      error = true;
      console.log(e);
    }

    try {
      if (error) {
        await this.wait(10000);
        await this.get();
        this.seasonsStore.setLoading(false);
      } else {
        await this.get();
        this.seasonsStore.setLoading(false);
      }
    } catch (e) {
      this.seasonsStore.setLoading(false);
    }

  }

  getAttr(attrs: any[], id: string, dd: string) {
    const index = attrs.map(x => x.id).indexOf(id);
    if (index === -1) { return undefined; }
    return attrs[index][dd];
  }

  async wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }


}
