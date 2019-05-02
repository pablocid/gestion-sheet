import { Injectable } from '@angular/core';
import { Db, Collection } from 'zangodb';
@Injectable({
    providedIn: 'root'
})
export class ZangoService {
    public db: Db;
    public records: Collection;
    constructor() {
        this.db = new Db('ana-db', 1, { records: ['range'] });
        this.records = this.db.collection('records');
        this.db.on('insert', (x) => {
            console.log('Insert', x);
        });

    }

    async insert(doc) {
        const result = await this.records.insert(doc);
    }
}
