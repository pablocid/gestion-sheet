import { NectarinState } from '../variety/state/state.interface';
import { mean, flatten } from 'lodash';
export class NectarinVariety {
    constructor(private state: NectarinState) { }
    // info especie general
    public id = this.state.id;
    public cultivar = this.state.ncv;
    public temporada = this.state.temporada;
    public especie = this.state.especie;
    public programa = this.state.pmg;
    public status_evaluativo = this.state.status_evaluativo;
    public centros = this.state.centro_evaluativo;
    private calibreRules = [
        { range: [0, 81], calibre: '>84' },
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
        { range: [318, 1000], calibre: '<26' },
    ];
    private defectosFruto = [
        { id: 'carozo partido', not: 'cerrado', label: '', position: 0 },
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
        { id: 'pre-calibre', not: false, label: 'pre-calibre', position: 0 },
        { id: 'sobre-calibre', not: false, label: 'sobre-calibre', position: 0 },
        { id: 'sobre maduro', not: false, label: 'sobre maduro', position: 0 },
        { id: 'Herida abierta', not: false, label: 'Herida abierta', position: 0 },
        { id: 'Herida cicatrizada', not: false, label: 'Herida cicatrizada', position: 0 },
        { id: 'Manchas', not: false, label: 'Manchas', position: 0 },
        { id: 'Machucones', not: false, label: 'Machucones', position: 0 },
    ];
    // info centro
    public centro(index: number) {
        return this.state.centro_evaluativo[index];
    }
    public centroName(index: number) {
        return this.centro(index).centro_evaluativo;
    }
    private currentCenter(index: number): string {
        return `${this.id} - ${this.centroName(index)}`;
    }
    public centroProp(propName: string, index: number) {
        return this.centro(index)[propName];
    }
    public inicioFloracion(index: number): Date {
        if (
            !Array.isArray(this.centro(index).fenologia) ||
            !this.centro(index).fenologia.length ||
            !this.centro(index).fenologia[0].ifl
        ) { return undefined; }
        if (this.centro(index).fenologia.length > 1) {
            // tslint:disable-next-line:max-line-length
            console.log(`Warning: Hay mas de un registro para la fenología en la variedad ${this.id} en el centro evaluativo ${this.centroName(index)} `);
        }
        if (isNaN(this.centro(index).fenologia[0].ifl)) {
            // tslint:disable-next-line:max-line-length
            console.log(`Error: La fecha registrada en inicio de floración no corresponde al formato serial para la fenología en la variedad ${this.id} en el centro evaluativo ${this.centroName(index)} `);
            return undefined;
        }
        return this.excelDateToJSDate2(this.centro(index).fenologia[0].ifl);
    }
    public plenaFloracion(index: number): Date {
        if (
            !Array.isArray(this.centro(index).fenologia) ||
            !this.centro(index).fenologia.length ||
            !this.centro(index).fenologia[0].pfl
        ) { return undefined; }
        if (this.centro(index).fenologia.length > 1) {
            // tslint:disable-next-line:max-line-length
            console.log(`Warning: Hay mas de un registro para la fenología en la variedad ${this.id} en el centro evaluativo ${this.centroName(index)} `);
        }
        if (isNaN(this.centro(index).fenologia[0].pfl)) {
            // tslint:disable-next-line:max-line-length
            console.log(`Error: La fecha registrada en plena flor no corresponde al formato serial para la fenología en la variedad ${this.id} en el centro evaluativo ${this.centroName(index)} `);
            return undefined;
        }
        return this.excelDateToJSDate2(this.centro(index).fenologia[0].pfl);
    }
    public inicioCosecha(index: number): Date {
        const cosechas = this.centro(index).cosecha;
        if (!Array.isArray(cosechas) || cosechas.length === 0) { return; }
        return cosechas
            .map(x => this.excelDateToJSDate2(x.fecha_cosecha))
            .reduce(function (acc, curr) {
                if (acc < curr) { return acc; } else { return curr; }
            });
    }
    public numeroRamillas(index: number): number {
        try {
            const r = this.centro(index).ramillas;
            if (!r.length) { return 0; }
            const sum = r.map(x => x.valor).reduce((acc, curr) => {
                return acc + curr;
            });
            return sum / r.length;
        } catch (e) {
            console.log(` Error in Function numeroRamillas - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public numeroFrutosPlanta(index: number): number {
        try {
            const r = this.centro(index).raleo.filter(x => x.momento_raleo === 'post-raleo');
            if (!r.length) { return 0; }
            const sum = r.map(x => x.valor).reduce((acc, curr) => acc + curr);
            return sum / r.length;
        } catch (e) {
            console.log(` Error in Function numeroFrutosPlanta - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public vigor(index: number): string {
        try {
            const r = this.centro(index).vigor[0];
            if (r) {
                return r['valor'];
            }
        } catch (e) {
            console.log(` Error in Function vigor - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public floresPorMetroLineal(index: number): number {
        try {
            const r = this.centro(index).floribundidad;
            if (!r.length) { return undefined; }

            const yemas = r.filter(x => x.floribundidad === 'yemas florales ramilla');
            const ramillas = r.filter(x => x.floribundidad === 'largo de ramilla');

            if (!ramillas.length || !yemas.length) { return undefined; }
            const sumR = ramillas.map(x => x.valor).reduce((acc, curr) => acc + curr);
            const promR = (sumR / ramillas.length) / 100; // transformar a metros
            const sumY = yemas.map(x => x.valor).reduce((acc, curr) => acc + curr);
            const promY = sumY / yemas.length;

            return promY / promR;
        } catch (e) {
            console.log(` Error in Function floresPorMetroLineal - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public frutosCuajadosPorMetroLineal(index: number): number {
        try {
            const r = this.centro(index).floribundidad;
            if (!r.length) { return undefined; }
            const fc = r.filter(x => x.floribundidad === 'frutos cuajados');
            const ramillas = r.filter(x => x.floribundidad === 'largo de ramilla');

            if (!ramillas.length || !fc.length) { return undefined; }
            const sumR = ramillas.map(x => x.valor).reduce((acc, curr) => acc + curr);
            const promR = (sumR / ramillas.length) / 100; // transformar a metros
            const sumFC = fc.map(x => x.valor).reduce((acc, curr) => acc + curr);
            const promFC = sumFC / fc.length;

            return promFC / promR;
        } catch (e) {
            console.log(` Error in Function frutosCuajadosPorMetroLineal - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public rendimientoTotal(index: number): number {
        try {
            const pesaje = this.centro(index).cosecha
                .map(x => x.cosecha_pesaje)
                .reduce((a, b) => a.concat(b), [])
                .map(x => x.peso);
            // console.log('pesaje', this.average(pesaje));
            const average = pesaje.reduce((a, b) => a + b, 0) / pesaje.length;
            return Math.round(this.numeroFrutosPlanta(index) * average * this.centroProp('plantas_ha', index) / 1000 / 1000); // toneladas;
        } catch (e) {
            console.log(` Error in Function rendimientoTotal - ${this.currentCenter(index)}: ${e}`);
        }
    }
    // tslint:disable-next-line:max-line-length
    public fotosPrecosecha(index: number, momento: string, first: boolean): any {
        try {
            const pics = this.centro(index).fotos
                .filter(x => x.momento_foto === momento)
                .map(x => {
                    /** TODO: remove extension in thumbnail and put always jpg extension */
                    return {
                        url: 'https://s3.amazonaws.com/ana-photos/' + x.nombre_foto,
                        // tslint:disable-next-line:max-line-length
                        thumbnail: 'https://s3.amazonaws.com/ana-photos/thumbnails/' + x.nombre_foto.split('.').slice(0, -1).join('.') + '.jpg',
                        description: x.descripcion_foto,
                        momento: x.momento_foto
                    };
                });
            if (first) {
                return pics[0];
            } else {
                return pics;
            }
        } catch (e) {
            console.log(` Error in Function fotosPrecosecha - ${this.currentCenter(index)}: ${e}`);
            return [];
        }
    }
    public fotoPrincipal(index: number): string {
        try {
            const pics = this.centro(index).fotos
                .filter(x => x.descripcion_foto === 'foto_principal')
                .map(x => {
                    return 'https://s3.amazonaws.com/ana-photos/' + x.nombre_foto;
                });
            return pics[0];
        } catch (e) {
            console.log(` Error in Function fotoPrincipal - ${this.currentCenter(index)}: ${e}`);
            return undefined;
        }
    }
    public monitoreoGraphData(index: number) {
        try {
            const presionMonitoreo = this.centro(index).monitoreo_precosecha
                .sort((a, b) => a.fecha_muestreo - b.fecha_muestreo)
                .map(x => {
                    return { ...x, fecha: x.fecha_muestreo, ecuatorial_total: (x.ecuatorial1 + x.ecuatorial2) / 2 };
                });

            const presionCosechas = this.centro(index).cosecha
                .map(c => c.cosecha_presiones).reduce((p, n) => p.concat(n), [])
                .map(x => {
                    return { ...x, fecha: x.fecha_cosecha, ecuatorial_total: (x.ecuatorial1 + x.ecuatorial2) / 2 };
                });
            console.log('presionCosechas', presionCosechas);
            const group = [
                ...this.arrayGroup(presionMonitoreo, 'fecha', true, 'number'),
                ...this.arrayGroup(presionCosechas, 'fecha', true, 'number')
            ];
            console.log('group', group);

            const data = {
                name: 'Presiones',
                series: group.map((x, i) => {
                    return {
                        name: this.excelDateToJSDate2(x.group),
                        value: mean(x.values.map(p => p.ecuatorial_total))
                    };
                })
            };
            console.log('data', data);
            return {
                series: [data],
                showXAxis: true,
                showYAxis: true,
                gradient: false,
                showLegend: false,
                showXAxisLabel: true,
                xAxisLabel: 'Fecha',
                showYAxisLabel: true,
                yAxisLabel: 'presiones (lb)',
                colorScheme: { domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060'] },
                autoScale: true,
                title: 'Presiones (lb) ',
                variedad: this.cultivar,
                temporada: this.temporada,
                centro: this.centroName(index),
            };
        } catch (e) {
            console.log(` Error in Function monitoreoGraphData - ${this.currentCenter(index)}: ${e}`);
            return {
                series: [],
                showXAxis: true,
                showYAxis: true,
                gradient: false,
                showLegend: false,
                showXAxisLabel: true,
                xAxisLabel: 'Fecha',
                showYAxisLabel: true,
                yAxisLabel: 'presiones (lb)',
                colorScheme: { domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060'] },
                autoScale: true,
                title: 'Presiones (lb) ',
                variedad: this.cultivar,
                temporada: this.temporada,
                centro: this.centroName(index),
            };
        }
    }
    private arrayGroup(arr: any[], key: string, array?: boolean, datatype?: string): { group: any, values: any[] } | any {
        const obj = {};
        for (let i = 0; i < arr.length; i++) {
            if (!Array.isArray(obj[arr[i][key]])) { obj[arr[i][key]] = []; }
            obj[arr[i][key]].push(arr[i]);
        }
        if (array) {
            if (datatype === 'number') { return Object.keys(obj).map(x => ({ group: parseInt(x, 10), values: obj[x] })); }
            return Object.keys(obj).map(x => ({ group: x, values: obj[x] }));
        }

        return obj;

    }
    private excelDateToJSDate2(date): Date {
        // return new Date((excelDate - (25567 + 1)) * 86400 * 1000);
        return new Date(Math.round((date - 25568) * 86400 * 1000));
    }
    public cosechas(index: number) {
        try {
            return this.centro(index).cosecha;
        } catch (e) {
            console.log(` Error in Function cosechas - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public cosechasExist(index: number): boolean {
        try {
            return this.centro(index).cosecha.length > 0;
        } catch (e) {
            console.log(` Error in Function cosechas - ${this.currentCenter(index)}: ${e}`);
            return false;
        }
    }
    public cosecha(index: number, ic: number) {
        try {
            return this.centro(index).cosecha[ic];
        } catch (e) {
            console.log(` Error in Function cosecha - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public fechaCosecha(index: number, ic: number): Date {
        try {
            return this.excelDateToJSDate2(this.cosecha(index, ic).fecha_cosecha);
        } catch (e) {
            console.log(` Error in Function fechaCosecha - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public cosechaProp(prop: string, index: number, ic: number) {
        try {
            return this.cosecha(index, ic)[prop];
        } catch (e) {
            // tslint:disable-next-line:max-line-length
            console.log(` Error in Function cosechaProp con argumentos { prop: ${prop}, index: ${index}, indexCosecha: ${ic} } - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public frutosExportables(index: number, ic: number): number {
        try {
            const frutosCosechados = this.cosechaProp('frutos_cosechados', index, ic);
            const frutosNoExport = this.cosechaProp('frutos_noexportables', index, ic);
            return ((frutosCosechados - frutosNoExport) / frutosCosechados) * 100;
        } catch (e) {
            console.log(` Error in Function frutosExportables - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public pesoFruto(index: number, ic: number): number {
        try {
            const p = this.cosecha(index, ic).cosecha_pesaje;
            if (!p.length) { return 0; }
            const sumP = p.map(x => x.peso).reduce((acc, curr) => acc + curr);
            return sumP / p.length;
        } catch (e) {
            console.log(` Error in Function pesoFruto - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public calibre(index: number, ic: number): string {
        try {
            const prom_peso = this.pesoFruto(index, ic);
            for (let i = 0; i < this.calibreRules.length; i++) {
                const rule = this.calibreRules[i];
                if (prom_peso > rule.range[0] && prom_peso <= rule.range[1]) {
                    return rule.calibre;
                }
            }
        } catch (e) {
            console.log(` Error in Function calibre - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public presionEcuatorial(index: number, ic: number): number {
        try {
            const p = this.cosecha(index, ic).cosecha_presiones;
            if (!p.length) { return 0; }
            const e1 = p.map(x => x.ecuatorial1);
            const e2 = p.map(x => x.ecuatorial2);
            const ecu = [...e1, ...e2];
            const sum = ecu.reduce((acc, curr) => acc + curr, 0);
            return sum / ecu.length;
        } catch (e) {
            console.log(` Error in Function presionEcuatorial - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public puntoMasBlando(index: number, ic: number) {
        try {
            const p = this.cosecha(index, ic).cosecha_presiones;
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

        } catch (e) {
            console.log(` Error in Function puntoMasBlando - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public brix(index: number, ic: number) {
        try {
            const p = this.cosecha(index, ic).cosecha_presiones;
            if (!p.length) {
                // console.log('sin solidos');
                return 0;
            }
            const ss = p.map(x => x.solidos_solubles);
            return ss.reduce((acc, curr) => acc + curr, 0) / ss.length;
        } catch (e) {
            console.log(` Error in Function brix - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public acidez(index: number, ic: number) {
        try {
            const p = this.cosecha(index, ic).cosecha_presiones;
            if (!p.length) { return 0; }
            const ss = p.map(x => x.acidez);
            return ss.reduce((acc, curr) => acc + curr, 0) / ss.length;
        } catch (e) {
            console.log(` Error in Function acidez - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public defectosCosecha(index: number, ic: number) {
        try {
            const t_frutos = this.cosecha(index, ic).frutos_cosechados;
            if (!t_frutos) {
                // console.log('sin fruit ');
                return [];
            }
            const p = this.cosecha(index, ic).cosecha_defectos;
            if (!p.length) { return []; }

            const acum = [];

            for (let i = 0; i < this.defectosFruto.length; i++) {
                try {
                    const defecto = this.defectosFruto[i];
                    let frutos = p.filter(x => x.defectos === defecto.id);

                    if (!frutos.length) { continue; }
                    if (defecto.not) { frutos = frutos.filter(x => x.intensidad_defecto !== defecto.not); }
                    // console.log(frutos.length, defecto.id, frutos.map(x=>x.defectos))
                    const sum = frutos.map(x => x.n_frutos).reduce((a, c) => a + c);
                    const prom = sum / t_frutos;
                    acum.push({ ...defecto, value: prom });
                } catch (e) {

                }

            }

            return acum;
        } catch (e) {
            console.log(` Error in Function defectosCosecha - ${this.currentCenter(index)}: ${e}`);
            return [];
        }
    }
    public fotosCosecha(index: number, ic: number) {
        try {
            return this.cosecha(index, ic).fotos
                .filter(x => x.momento_foto === 'cosecha')
                .filter(x => this.defectosFruto.map(d => d.id).indexOf(x.descripcion_foto) === -1).map(x => {
                    /** TODO: remove extension in thumbnail and put always jpg extension */
                    return {
                        url: 'https://s3.amazonaws.com/ana-photos/' + x.nombre_foto,
                        // tslint:disable-next-line:max-line-length
                        thumbnail: 'https://s3.amazonaws.com/ana-photos/thumbnails/' + x.nombre_foto.split('.').slice(0, -1).join('.') + '.jpg',
                        description: x.descripcion_foto,
                        momento: x.momento_foto
                    };
                });
        } catch (e) {
            console.log(` Error in Function fotosCosecha - ${this.currentCenter(index)}: ${e}`);
            return [];
        }
    }
    public fotosDefectosCosecha(index: number, ic: number) {
        try {
            return this.cosecha(index, ic).fotos
                .filter(x => x.momento_foto === 'daños y defectos')
                .filter(x => this.defectosFruto.map(d => d.id).indexOf(x.descripcion_foto) !== -1).map(x => {
                    /** TODO: remove extension in thumbnail and put always jpg extension */
                    return {
                        url: 'https://s3.amazonaws.com/ana-photos/' + x.nombre_foto,
                        // tslint:disable-next-line:max-line-length
                        thumbnail: 'https://s3.amazonaws.com/ana-photos/thumbnails/' + x.nombre_foto.split('.').slice(0, -1).join('.') + '.jpg',
                        description: x.descripcion_foto,
                        momento: x.momento_foto
                    };
                });
        } catch (e) {
            console.log(` Error in Function fotosDefectosCosecha - ${this.currentCenter(index)}: ${e}`);
            return [];
        }
    }
    public calibreGraphData(index: number, ic: number) {
        try {
            const p = this.cosecha(index, ic).cosecha_pesaje;
            if (!p.length) { return []; }
            const list = Array.from(Array(this.calibreRules.length), () => 0);

            const pfil = p.map(x => x.peso).filter(x => x);
            for (let i = 0; i < pfil.length; i++) {
                const elem = pfil[i];
                const e = this.getCalibreIndex(elem);
                list[e] += 1;
            }

            // console.log(p.length, list.reduce((acc, curr) => { return acc + curr }, 0))

            const series = {
                name: 'Calibre',
                series: list
                    .map(x => {
                        if (!x) { return x; }
                        return x / list.reduce((acc, curr) => acc + curr, 0);
                    })
                    .map((x, i) => {
                        return {
                            name: this.calibreRules[i].calibre,
                            value: x * 100
                        };
                    })
            };
            return {
                series: [series],
                single: series.series,
                showXAxis: true,
                showYAxis: true,
                gradient: false,
                showLegend: false,
                showXAxisLabel: true,
                xAxisLabel: 'Calibre',
                showYAxisLabel: true,
                yAxisLabel: '% de frutos',
                colorScheme: { domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060'] },
                autoScale: true,
                variedad: this.cultivar,
                temporada: this.temporada,
                centro: this.centroName(index),
                title: 'Distribución de calibres'
            };
        } catch (e) {
            console.log(` Error in Function calibreGraphData - ${this.currentCenter(index)}: ${e}`);
        }
    }

    public allCalibreGraphData(index: number) {
        try {
            const p = flatten(this.centro(index).cosecha.map(x => x.cosecha_pesaje));
            if (!p.length) { return []; }
            const list = Array.from(Array(this.calibreRules.length), () => 0);

            const pfil = p.map(x => x.peso).filter(x => x);
            for (let i = 0; i < pfil.length; i++) {
                const elem = pfil[i];
                const e = this.getCalibreIndex(elem);
                list[e] += 1;
            }

            // console.log(p.length, list.reduce((acc, curr) => { return acc + curr }, 0))

            const series = {
                name: 'Calibre',
                series: list
                    .map(x => {
                        if (!x) { return x; }
                        return x / list.reduce((acc, curr) => acc + curr, 0);
                    })
                    .map((x, i) => {
                        return {
                            name: this.calibreRules[i].calibre,
                            value: x * 100
                        };
                    })
            };
            return {
                series: [series],
                single: series.series,
                showXAxis: true,
                showYAxis: true,
                gradient: false,
                showLegend: false,
                showXAxisLabel: true,
                xAxisLabel: 'Calibre',
                showYAxisLabel: true,
                yAxisLabel: '% de frutos',
                colorScheme: { domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060'] },
                autoScale: true,
                variedad: this.cultivar,
                temporada: this.temporada,
                centro: this.centroName(index),
                title: 'Distribución de calibres'
            };
        } catch (e) {
            console.log(` Error in Function calibreGraphData - ${this.currentCenter(index)}: ${e}`);
        }
    }
    private getCalibreIndex(prom_peso) {
        for (let i = 0; i < this.calibreRules.length; i++) {
            const rule = this.calibreRules[i];
            if (prom_peso > rule.range[0] && prom_peso <= rule.range[1]) {
                return i;
            }
        }
    }
    public postcosechas(index: number, ic: number) {
        try {
            return this.cosecha(index, ic).postcosecha;
        } catch (e) {
            console.log(` Error in Function postcosechas - ${this.currentCenter(index)}: ${e}`);
            return [];
        }
    }
    public postcosechasExist(index: number, ic: number): boolean {
        try {
            return this.cosecha(index, ic).postcosecha.length > 0;
        } catch (e) {
            console.log(` Error in Function postcosechas - ${this.currentCenter(index)}: ${e}`);
            return false;
        }
    }
    public postcosecha(index: number, ic: number, ipc: number) {
        try {
            return this.cosecha(index, ic).postcosecha[ipc];
        } catch (e) {
            console.log(` Error in Function postcosecha - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public fechaSalidaFrio(index: number, ic: number, ipc: number): Date {
        try {
            return this.excelDateToJSDate2(this.postcosecha(index, ic, ipc).fecha_salida_frio);
        } catch (e) {
            console.log(` Error in Function fechaSalidaFrio - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public fechaEvaluacionSalidaFrio(index: number, ic: number, ipc: number): Date {
        try {
            return this.excelDateToJSDate2(this.postcosecha(index, ic, ipc).fecha_evaluacion);
        } catch (e) {
            console.log(` Error in Function fechaEvaluacionSalidaFrio - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public shelflife(index: number, ic: number, ipc: number): number {
        try {
            // tslint:disable-next-line:max-line-length
            return this.datediff(this.fechaSalidaFrio(index, ic, ipc), this.fechaEvaluacionSalidaFrio(index, ic, ipc));
        } catch (e) {
            console.log(` Error in Function shelflife - ${this.currentCenter(index)}: ${e}`);
        }
    }
    private datediff(first: any, second: any): number {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }
    public diasGuarda(index: number, ic: number, ipc: number): number {
        try {
            // tslint:disable-next-line:max-line-length
            return this.datediff(this.fechaCosecha(index, ic), this.fechaSalidaFrio(index, ic, ipc));
        } catch (e) {
            console.log(` Error in Function diasGuarda - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public postcosechaProp(prop: string, index: number, ic: number, ipc: number) {
        try {
            return this.postcosecha(index, ic, ipc)[prop];
        } catch (e) {
            console.log(` Error in Function postcosechaProp - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public presionEcuatorialPostcosecha(index: number, ic: number, ipc: number): number {
        try {
            const p = this.postcosecha(index, ic, ipc).postcosecha_presiones;
            if (!p.length) { return 0; }
            const e1 = p.map(x => x.ecuatorial1);
            const e2 = p.map(x => x.ecuatorial2);
            const ecu = [...e1, ...e2];
            const sum = ecu.reduce((acc, curr) => acc + curr, 0);
            return sum / ecu.length;
        } catch (e) {
            console.log(` Error in Function xx - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public puntoMasBlandoPostcosecha(index: number, ic: number, ipc: number) {
        try {
            const p = this.postcosecha(index, ic, ipc).postcosecha_presiones;
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

        } catch (e) {
            console.log(` Error in Function puntoMasBlando - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public brixPost(index: number, ic: number, ipc: number) {
        try {
            const p = this.postcosecha(index, ic, ipc).postcosecha_presiones;
            if (!p.length) {
                // console.log('sin solidos');
                return 0;
            }
            const ss = p.map(x => x.solidos_solubles);
            return ss.reduce((acc, curr) => acc + curr, 0) / ss.length;
        } catch (e) {
            console.log(` Error in Function brixPost - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public acidezPost(index: number, ic: number, ipc: number) {
        try {
            const p = this.postcosecha(index, ic, ipc).postcosecha_presiones;
            if (!p.length) { return 0; }
            const ss = p.map(x => x.acidez);
            return ss.reduce((acc, curr) => acc + curr, 0) / ss.length;
        } catch (e) {
            console.log(` Error in Function acidezPost - ${this.currentCenter(index)}: ${e}`);
        }
    }
    public defectosPostcosecha(index: number, ic: number, ipc: number) {
        try {
            const t_frutos = this.postcosecha(index, ic, ipc).n_muestra;
            if (!t_frutos) { return []; }
            const p = this.postcosecha(index, ic, ipc).postcosecha_defectos;
            if (!p.length) { return []; }

            const acum = [];

            for (let i = 0; i < this.defectosFruto.length; i++) {
                try {
                    const defecto = this.defectosFruto[i];
                    let frutos = p.filter(x => x.defectos === defecto.id);
                    if (defecto.not) { frutos = frutos.filter(x => x.intensidad_defecto !== defecto.not); }
                    if (!frutos.length) { continue; }
                    // console.log(frutos.length, defecto.id, frutos.map(x=>x.defectos))
                    const sum = frutos.map(x => x.frutos).reduce((a, c) => a + c);
                    const prom = sum / t_frutos;
                    acum.push({ ...defecto, value: prom });
                } catch (e) {

                }
            }

            return acum;
        } catch (e) {
            console.log(` Error in Function defectosPostcosecha - ${this.currentCenter(index)}: ${e}`);
            return [];
        }
    }
    public fotosPostcosecha(index: number, ic: number, ipc: number) {
        try {
            return this.postcosecha(index, ic, ipc).fotos
                .filter(x => x.momento_foto === 'post-cosecha')
                .filter(x => this.defectosFruto.map(d => d.id).indexOf(x.descripcion_foto) === -1).map(x => {
                    /** TODO: remove extension in thumbnail and put always jpg extension */
                    return {
                        url: 'https://s3.amazonaws.com/ana-photos/' + x.nombre_foto,
                        // tslint:disable-next-line:max-line-length
                        thumbnail: 'https://s3.amazonaws.com/ana-photos/thumbnails/' + x.nombre_foto.split('.').slice(0, -1).join('.') + '.jpg',
                        description: x.descripcion_foto,
                        momento: x.momento_foto
                    };
                });
        } catch (e) {
            console.log(` Error in Function fotosCosecha - ${this.currentCenter(index)}: ${e}`);
            return [];
        }
    }

}


/*
try {
} catch (e) {
    console.log(` Error in Function xx - ${this.currentCenter(index)}: ${e}`);
}
*/
