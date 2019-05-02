import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { NectarinStore } from './nectarin.store';
// tslint:disable-next-line:max-line-length
import { NectarinState, INectarinCosecha, INectarinFenologia, INectarinRamillas, INectarinRaleo, INectarinVigor, INectarinFloribundidad, INectarinFoto, INectarinCosechaPesaje, INectarinCentroEvaluativo, INectarinPostcosechaPresion, INectarinCosechaPresion, INectarinCosechaDefecto, INectarinPostcosecha, INectarinPostcosechaDefecto } from './state.interface';
import { INectarinPrint, INectarinPrintFloribundidad, INectarinPrintCosecha, INectarinPrintPostcosecha } from './print.interface';

@Injectable({ providedIn: 'root' })
export class NectarinQuery extends Query<NectarinState> {

  constructor(protected store: NectarinStore) {
    super(store);
  }

  private rules = [
    { range: [0, 81], calibre: 'bajo calibre' },
    { range: [81, 93], calibre: '84' },
    { range: [93, 100], calibre: '78' },
    { range: [100, 109], calibre: '72' },
    { range: [109, 120], calibre: '66' },
    { range: [120, 130], calibre: '60' },
    { range: [130, 143], calibre: '56' },
    { range: [143, 154], calibre: '52' },
    { range: [154, 167], calibre: '48' },
    { range: [167, 182], calibre: '44' },
    { range: [182, 205], calibre: '40' },
    { range: [205, 228], calibre: '36' },
    { range: [228, 257], calibre: '32' },
    { range: [257, 276], calibre: '30' },
    { range: [276, 296], calibre: '28' },
    { range: [296, 318], calibre: '26' },
    { range: [318, 1000], calibre: 'sobre calibre' },
  ];

  private defectos = [
    { id: 'carozo partido', not: '', label: '', position: 0 },
    { id: 'presencia quilla', not: '', label: '', position: 0 },
    { id: 'presencia punta', not: '', label: '', position: 0 },
    { id: 'vellosidad', not: '', label: '', position: 0 },
    { id: 'russet', not: 'leve', label: '', position: 0 },
    { id: 'grietas', not: '', label: '', position: 0 },
    { id: 'caspocidad', not: 'leve', label: 'Casposidad', position: 0 },
    { id: 'golpe sol', not: 'leve', label: 'Golpe de sol', position: 0 },
    { id: 'deforme', not: '', label: 'Frutos deformes', position: 0 },
    { id: 'desgarro peduncular', not: '', label: 'Desgarro peduncular', position: 0 },
    { id: 'abertura estilar', not: '', label: 'Abertura estilar', position: 0 },
    { id: 'pudricion', not: '', label: 'Pudrición', position: 0 },
    { id: 'deshidratacion', not: '', label: 'Frutos deshidratados', position: 0 },
    { id: 'inking', not: 'leve', label: 'Inking', position: 0 },
    { id: 'pardeamiento ', not: '', label: 'Frutos pardeados', position: 0 },
    { id: 'harinosidad', not: 'leve', label: 'Harinosidad', position: 0 },
    { id: 'pulpa traslucida', not: 'leve', label: 'Pulpa traslúcida', position: 0 },
  ];

  transform() {
    return this.select(ide => this.makeTransform(ide));
  }

  makeTransform(ide: NectarinState): INectarinPrint { // INectarinPrint

    return {
      id: ide.id,
      especie: ide.especie,
      cultivar: ide.ncv,
      programa: ide.pmg,
      temporada: ide.temporada,
      status_evaluativo: ide.status_evaluativo,
      centro_evaluativo: ide.centro_evaluativo.map(centro => {
        return {
          name: centro.centro_evaluativo,
          porta_injerto: centro.portainjerto,
          plantas_ha: centro.plantas_ha,
          ano_plantacion: centro.ano_plantacion,
          marco_plantacion: centro.marco_plantacion,
          monitoreo: centro.monitoreo_precosecha,
          inicio_cosecha: this.inicioCosecha(centro.cosecha),
          fenologia: this.fenoDate(centro.fenologia),
          numero_ramillas: this.promRamilla(centro.ramillas),
          post_raleo: this.postRaleo(centro.raleo),
          main_pic: this.getPic(centro.fotos, 'foto_principal')[0],
          vigor: this.getVigor(centro.vigor),
          floribundidad: this.getFlori(centro.floribundidad),
          foto_floracion: this.getPic(centro.fotos, 'floracion'),
          foto_cuaja: this.getPic(centro.fotos, 'cuaja'),
          foto_raleo: this.getPic(centro.fotos, 'raleo'),
          cosecha: centro.cosecha.map(cosecha => this.getCosecha(cosecha, centro)),
          rendimiento_total: this.getYield(centro)
        };
      })
    };
  }

  getYield(centro: INectarinCentroEvaluativo): number {
    const pesaje = centro.cosecha
      .map(x => x.cosecha_pesaje)
      .reduce((a, b) => a.concat(b), [])
      .map(x => x.peso);
    // console.log('pesaje', this.average(pesaje));
    return Math.round(this.postRaleo(centro.raleo) * this.average(pesaje) * centro.plantas_ha / 1000 / 1000); // toneladas;
  }

  average(arr: number[]) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  getCosecha(cosecha: INectarinCosecha, centro: INectarinCentroEvaluativo): INectarinPrintCosecha {
    return {
      fecha: this.excelDateToJSDate2(cosecha.fecha_cosecha),
      forma: cosecha.forma_fruto,
      sobre_color: cosecha.porcentage_color,
      color_pulpa: cosecha.color_pulpa,
      color_cubrimiento: cosecha.color_cubrimiento,
      sabor: cosecha.sabor,
      observaciones: cosecha.observaciones,
      peso_prom: this.getPesoProm(cosecha.cosecha_pesaje),
      calibre: this.getCalibre(this.getPesoProm(cosecha.cosecha_pesaje)),
      calibres: this.getCalibreClasificacion(cosecha.cosecha_pesaje),
      rendimiento: this.getRend(this.getPesoProm(cosecha.cosecha_pesaje), cosecha.cosecha_pesaje, centro.plantas_ha),
      promedio_ecuatorial: this.getEcuatorial(cosecha.cosecha_presiones),
      punto_blando: this.getPuntoBlando(cosecha.cosecha_presiones),
      brix: this.getSS(cosecha.cosecha_presiones),
      acidez: this.getAc(cosecha.cosecha_presiones),
      defectos: this.getDefectosCos(cosecha.cosecha_defectos, cosecha.frutos_cosechados),
      fotos: this.getPic(cosecha.fotos, 'cosecha', { exclude: this.defectos.map(x => x.id) }),
      fotos_defectos: this.getPic(cosecha.fotos, 'daños y defectos', { include: this.defectos.map(x => x.id) }),
      postcosecha: cosecha.postcosecha.map(postcosecha => this.getPostCosecha(postcosecha)),
      cosecha
    };
  }

  getPostCosecha(postcosecha: INectarinPostcosecha): INectarinPrintPostcosecha {

    return {
      fecha_salida: this.excelDateToJSDate2(postcosecha.fecha_salida_frio),
      fecha_evaluacion: this.excelDateToJSDate2(postcosecha.fecha_evaluacion),
      // tslint:disable-next-line:max-line-length
      shelflife: this.getShelflife(this.excelDateToJSDate2(postcosecha.fecha_salida_frio), this.excelDateToJSDate2(postcosecha.fecha_evaluacion)),
      dias: this.datediff(this.excelDateToJSDate2(postcosecha.fecha_cosecha), this.excelDateToJSDate2(postcosecha.fecha_salida_frio)),
      muestras: postcosecha.n_muestra,
      defectos: this.getDefectosPost(postcosecha.postcosecha_defectos, postcosecha.n_muestra),
      promedio_ecuatorial: this.getEcuatorialPost(postcosecha.postcosecha_presiones),
      punto_blando: this.getPuntoBlandoPost(postcosecha.postcosecha_presiones),
      brix: this.getSSPost(postcosecha.postcosecha_presiones),
      acidez: this.getAcPost(postcosecha.postcosecha_presiones),
      fotos: this.getPic(postcosecha.fotos, 'post-cosecha'),
      observaciones: postcosecha.observaciones
    };
  }

  inicioCosecha(cosechas: INectarinCosecha[]): Date {
    if (!Array.isArray(cosechas) || cosechas.length === 0) { return; }
    return cosechas
      .map(x => this.excelDateToJSDate2(x.fecha_cosecha))
      .reduce(function (acc, curr) {
        if (acc < curr) { return acc; } else { return curr; }
      });
  }
  excelDateToJSDate2(date) {
    // return new Date((excelDate - (25567 + 1)) * 86400 * 1000);
    return new Date(Math.round((date - 25568) * 86400 * 1000));
  }
  fenoDate(array: INectarinFenologia[]) {
    const f = array[0];
    const result = { inicio_floracion: undefined, plena_flor: undefined };
    if (f) {
      result.inicio_floracion = this.excelDateToJSDate2(f['ifl']);
      result.plena_flor = this.excelDateToJSDate2(f['pfl']);
    }

    return result;
  }
  promRamilla(ramillas: INectarinRamillas[]) {
    const r = ramillas;
    if (!r.length) { return 0; }
    const sum = r.map(x => x.valor).reduce((acc, curr) => {
      return acc + curr;
    });

    return sum / r.length;
  }
  postRaleo(arr: INectarinRaleo[]) {
    const r = arr.filter(x => x.momento_raleo === 'post-raleo');
    if (!r.length) { return 0; }
    const sum = r.map(x => x.valor).reduce((acc, curr) => acc + curr);
    return sum / r.length;
  }
  getVigor(arr: INectarinVigor[]) {
    const r = arr[0];
    if (r) {
      return r['valor'];
    }
  }
  getFlori(arr: INectarinFloribundidad[]): INectarinPrintFloribundidad {
    const r = arr;
    if (!r.length) { return { flores_ml: undefined, fc_ml: undefined }; }

    const yemas = r.filter(x => x.floribundidad === 'yemas florales ramilla');
    const fc = r.filter(x => x.floribundidad === 'frutos cuajados');
    const ramillas = r.filter(x => x.floribundidad === 'largo de ramilla');

    if (!ramillas.length) { return { flores_ml: undefined, fc_ml: undefined }; }
    const sumR = ramillas.map(x => x.valor).reduce((acc, curr) => acc + curr);
    const promR = (sumR / ramillas.length) / 100; // transformar a metros
    // console.log('promedio ramillas', promR);

    let flores_ml;
    if (yemas.length) {
      const sumY = yemas.map(x => x.valor).reduce((acc, curr) => acc + curr);
      const promY = sumY / yemas.length;
      // console.log('promedio yemas', promY);
      flores_ml = Math.round(promY / promR);
    }
    // console.log('flores', flores_ml)
    let fc_ml;
    if (fc.length) {
      const sumFc = fc.map(x => x.valor).reduce((acc, curr) => acc + curr);
      const promFc = sumFc / fc.length;
      // console.log('promFc', promFc);
      fc_ml = Math.round(promFc / promR);
    }
    // console.log(flores_ml, fc_ml)
    return { flores_ml, fc_ml };

  }
  getPic(pics: INectarinFoto[], momento: string, options?: { include?: string[], exclude?: string[] }) {
    let p = pics
      .filter(x => x.momento_foto === momento);

    if (options) {
      // console.log('optinos.include', options)
      if (Array.isArray(options.include)) {
        p = p.filter(x => options.include.indexOf(x.descripcion_foto) !== -1);
      }
      if (Array.isArray(options.exclude)) {
        p = p.filter(x => options.exclude.indexOf(x.descripcion_foto) === -1);
      }
    }

    return p.map(x => {
      /** TODO: remove extension in thumbnail and put always jpg extension */

      return {
        url: 'https://s3.amazonaws.com/ana-photos/' + x.nombre_foto,
        thumbnail: 'https://s3.amazonaws.com/ana-photos/thumbnails/' + x.nombre_foto.split('.').slice(0, -1).join('.') + '.jpg',
        description: x.descripcion_foto,
        momento: x.momento_foto
      };
    });
  }
  getPesoProm(arrPesaje: INectarinCosechaPesaje[]) {
    const p = arrPesaje;
    if (!p.length) { return 0; }
    const sumP = p.map(x => x.peso).reduce((acc, curr) => acc + curr);
    return sumP / p.length;

  }
  getCalibre(prom_peso: number): string {
    for (let i = 0; i < this.rules.length; i++) {
      const rule = this.rules[i];
      if (prom_peso > rule.range[0] && prom_peso <= rule.range[1]) {
        return rule.calibre;
      }
    }
  }
  getCalibreClasificacion(arrPesaje: INectarinCosechaPesaje[]): number[] {
    const p = arrPesaje;
    if (!p.length) { return []; }
    const list = Array.from(Array(this.rules.length), () => 0);

    const pfil = p.map(x => x.peso).filter(x => x);
    for (let i = 0; i < pfil.length; i++) {
      const elem = pfil[i];
      const index = this.getCalibreIndex(elem);
      list[index] += 1;
    }

    // console.log(p.length, list.reduce((acc, curr) => { return acc + curr }, 0))

    return list.map(x => {
      if (!x) { return x; }
      return x / list.reduce((acc, curr) => acc + curr, 0);
    });
  }
  getCalibreIndex(prom_peso) {
    for (let i = 0; i < this.rules.length; i++) {
      const rule = this.rules[i];
      if (prom_peso > rule.range[0] && prom_peso <= rule.range[1]) {
        return i;
      }
    }

  }
  getRend(prom_fruto: number, arrPesaje: INectarinCosechaPesaje[], plH: number) {
    const p = arrPesaje;
    if (!p.length) { return 0; }
    const sumP = p.map(x => x.peso).reduce((acc, curr) => acc + curr);
    const promP = sumP / p.length;
    // return Math.round(prom_fruto * promP * plH / 8 / 1000);
    return Math.round(prom_fruto * promP * plH / 1000 / 1000); // toneladas

  }
  getEcuatorial(arr: INectarinCosechaPresion[]): number {
    const p = arr;
    if (!p.length) { return 0; }
    const e1 = p.map(x => x.ecuatorial1);
    const e2 = p.map(x => x.ecuatorial2);
    const ecu = [...e1, ...e2];
    const sum = ecu.reduce((acc, curr) => acc + curr, 0);
    return sum / ecu.length;
  }
  getPuntoBlando(arr: INectarinCosechaPresion[]): { value: number, index: string } {
    const p = arr;
    if (!p.length) { return { value: undefined, index: undefined }; }
    const hombro = p.map(x => x.hombro);
    const promHom = hombro.reduce((acc, curr) => acc + curr, 0) / hombro.length;
    const sutura = p.map(x => x.sutura);
    const promSut = sutura.reduce((acc, curr) => acc + curr, 0) / sutura.length;
    const punta = p.map(x => x.punta);
    const promPun = punta.reduce((acc, curr) => acc + curr, 0) / punta.length;
    const a = [promHom, promSut, promPun];
    // console.log(a)
    const bla = { value: undefined, index: 0 };
    for (let i = 0; i < a.length; i++) {
      const el = a[i];
      if (bla.value === undefined) { bla.value = el; bla.index = i; }
      if (bla.value > el) { bla.value = el; bla.index = i; }
    }
    let punto;
    if (bla.index === 0) { punto = 'hombro'; }
    if (bla.index === 1) { punto = 'sutura'; }
    if (bla.index === 2) { punto = 'punta'; }
    return {
      value: bla.value,
      index: punto
    };
  }
  getSS(arr: INectarinCosechaPresion[]) {
    const p = arr;
    if (!p.length) { console.log('sin solidos'); return 0; }
    const ss = p.map(x => x.solidos_solubles);
    return ss.reduce((acc, curr) => acc + curr, 0) / ss.length;
  }
  getAc(arr: INectarinCosechaPresion[]) {
    const p = arr;
    if (!p.length) { return 0; }
    const ss = p.map(x => x.acidez);
    return ss.reduce((acc, curr) => acc + curr, 0) / ss.length;
  }
  getDefectosCos(arr: INectarinCosechaDefecto[], t_frutos: number) {
    if (!t_frutos) { console.log('sin frutos '); return []; }
    const p = arr;
    if (!p.length) { return []; }

    const acum = [];

    for (let i = 0; i < this.defectos.length; i++) {
      const defecto = this.defectos[i];
      let frutos = p.filter(x => x.defectos === defecto.id);

      if (!frutos.length) { continue; }
      if (defecto.not) { frutos = frutos.filter(x => x.intensidad_defecto !== defecto.not); }
      // console.log(frutos.length, defecto.id, frutos.map(x=>x.defectos))
      const sum = frutos.map(x => x.n_frutos).reduce((a, c) => a + c);
      const prom = sum / t_frutos;
      acum.push({ ...defecto, value: prom });

    }

    return acum;
  }
  getShelflife(salida: Date, evalu: Date) {
    return this.datediff(salida, evalu);
  }
  datediff(first: any, second: any): number {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }
  getEcuatorialPost(arr: INectarinPostcosechaPresion[]): number {
    const p = arr;
    if (!p.length) { return 0; }
    const e1 = p.map(x => x.ecuatorial1);
    const e2 = p.map(x => x.ecuatorial2);
    const ecu = [...e1, ...e2];
    const sum = ecu.reduce((acc, curr) => acc + curr, 0);
    return sum / ecu.length;
  }
  getPuntoBlandoPost(arr: INectarinPostcosechaPresion[]): { value: number, index: string } {
    const p = arr;
    if (!p.length) { return { value: undefined, index: undefined }; }
    const hombro = p.map(x => x.hombro);
    const promHom = hombro.reduce((acc, curr) => acc + curr, 0) / hombro.length;
    const sutura = p.map(x => x.sutura);
    const promSut = sutura.reduce((acc, curr) => acc + curr, 0) / sutura.length;
    const punta = p.map(x => x.punta);
    const promPun = punta.reduce((acc, curr) => acc + curr, 0) / punta.length;
    const a = [promHom, promSut, promPun];
    // console.log(a)
    const bla = { value: undefined, index: 0 };
    for (let i = 0; i < a.length; i++) {
      const el = a[i];
      if (bla.value === undefined) { bla.value = el; bla.index = i; }
      if (bla.value > el) { bla.value = el; bla.index = i; }
    }
    let punto;
    if (bla.index === 0) { punto = 'hombro'; }
    if (bla.index === 1) { punto = 'sutura'; }
    if (bla.index === 2) { punto = 'punta'; }
    return {
      value: bla.value,
      index: punto
    };
  }
  getSSPost(arr: INectarinPostcosechaPresion[]) {
    const p = arr;
    if (!p.length) { console.log('sin solidos'); return 0; }
    const ss = p.map(x => x.solidos_solubles);
    return ss.reduce((acc, curr) => acc + curr, 0) / ss.length;
  }
  getAcPost(arr: INectarinPostcosechaPresion[]) {
    const p = arr;
    if (!p.length) { return 0; }
    const ss = p.map(x => x.acidez);
    return ss.reduce((acc, curr) => acc + curr, 0) / ss.length;
  }
  getDefectosPost(arr: INectarinPostcosechaDefecto[], t_frutos: number) {
    if (!t_frutos) { console.log('sin frutos '); return []; }
    const p = arr;
    if (!p.length) { return []; }

    const acum = [];

    for (let i = 0; i < this.defectos.length; i++) {
      const defecto = this.defectos[i];
      let frutos = p.filter(x => x.defectos === defecto.id);

      if (!frutos.length) { continue; }
      if (defecto.not) { frutos = frutos.filter(x => x.intensidad_defecto !== defecto.not); }
      // console.log(frutos.length, defecto.id, frutos.map(x=>x.defectos))
      if (!frutos.length) { continue; }
      const sum = frutos.map(x => x.frutos).reduce((a, c) => a + c);
      const prom = sum / t_frutos;
      acum.push({ ...defecto, value: prom });

    }

    return acum;
  }

}
