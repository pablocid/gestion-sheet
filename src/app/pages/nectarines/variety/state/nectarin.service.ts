import { Injectable } from '@angular/core';
import { NectarinStore } from './nectarin.store';
import { StitchService } from 'src/app/services/stitch/stitch.service';
import { ObjectId } from 'bson';
import { createInitialState } from './nectarin.store';
@Injectable({ providedIn: 'root' })
export class NectarinService {

  constructor(
    private nectarinStore: NectarinStore,
    private stitch: StitchService
  ) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
    // this.nectarinStore.set(entities);
    // });
  }

  async setVariety(id: string) {
    this.nectarinStore.setLoading(true);
    const response = await this.stitch.records().find({ _id: new ObjectId(id) }).first();
    // console.log(JSON.parse(JSON.stringify(response)));
    const respParsed = JSON.parse(JSON.stringify(response));
    this.nectarinStore.setState( x => respParsed);
    this.nectarinStore.setLoading(false);
  }

  unsetVariety() {
    this.nectarinStore.setState( x => createInitialState());
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
    // this.nectarinStore.add(entity);
    // });
  }

}
