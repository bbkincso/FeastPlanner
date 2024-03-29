import { isNil } from 'lodash-es';

export class Ingredient {
    public name: string;
    // public amount: number;
    // public unit: string;
    public aisle: string;
    public measures?: any = {
        metric: {
            amount: '',
            unitLong: '',
        },
        us: {
            amount: '',
            unitLong: '',
        }
    }

    constructor(config: any) {
        this.updateFromServerData(config);
    }

    updateFromServerData(config: any) {
        this.name = !isNil(config.name) ? config.name : this.name;
        this.aisle = !isNil(config.aisle) ? config.aisle : this.aisle;

        this.measures = !isNil(config.measures ) ? config.measures  : this.measures;
        // this.measures.metric = !isNil(config.measures.metric ) ? config.measures.metric  : this.measures.metric;
        // this.measures.metric.amount = !isNil(config.measures.metric.amount ) ? config.measures.metric.amount  : this.measures.metric.amount;
        // this.measures.metric.unitLong = !isNil(config.measures.metric.unitLong) ? config.measures.metric.unitLong : this.measures.metric.unitLong;
    }

    // getAmount(config) {
    //     return !isNil(config.measures.metric.amount) ? config.measures.metric.amount : config.amount;
    // }
    //
    // getUnit(config) {
    //     return !isNil(config.measures.metric.unitLong) ? config.measures.metric.unitLong : config.unit;
    // }
}
