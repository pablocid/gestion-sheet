import { Injectable } from '@angular/core';
import { NectarinesStore } from './nectarines.store';
import { SeasonQuery } from '../../season/state';
import { StitchService } from 'src/app/services/stitch/stitch.service';
import { AwsServiceClient } from 'mongodb-stitch-browser-services-aws';
import { AwsRequest } from 'mongodb-stitch-core-services-aws';

@Injectable({ providedIn: 'root' })
export class NectarinesService {

  constructor(
    private nectarinesStore: NectarinesStore,
    private seasonQ: SeasonQuery,
    private stitch: StitchService
  ) {
  }
  // tslint:disable-next-line:max-line-length
  public ranges = ['identificacion', 'centro_evaluativo', 'ramillas', 'fenologia', 'floribundidad', 'vigor', 'raleo', 'monitoreo_precosecha', 'cosecha', 'cosecha_presiones', 'cosecha_pesaje', 'cosecha_defectos', 'postcosecha', 'postcosecha_defectos', 'postcosecha_presiones', 'fotos', 'observaciones', 'conclusiones'];


  getVarietiesList() {
    const id = <string>this.seasonQ.getActiveId();

    // console.log('id', id);
    return this.stitch.client.callFunction('getVarList', [id]);
  }


  async get() {
    // NamedServiceClientFactory.
    // const data = await this.stitch.client.callFunction('getSeasons', ['Nectarines', 'temporada']);
    const aws = this.stitch.client.getServiceClient(AwsServiceClient.factory, 'AWSAccess');
    const Payload = { data: { spreadsheetId: '1pCq7si4KFOBpBn99ZRxL9wsshKAB6BpuIVKfNs-D9PY', ranges: this.ranges } };
    const request = new AwsRequest.Builder()
      .withService('lambda')
      .withAction('Invoke')
      .withArgs({
        FunctionName: 'getWorksheetsValues',
        Payload: JSON.stringify(Payload)
      });
    // const response = await this.stitch.client.getGeneralServiceClient('AWSAccess').callFunction('lambda', []);
    return aws.execute(request.build())
      .then((result: any) => {
        console.log(JSON.parse(result.Payload));
      });
    // this.seasonsStore.set(data);
    // return true;
  }

}
