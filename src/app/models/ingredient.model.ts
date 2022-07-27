import { isNil } from 'lodash-es';

export class Ingredient {
    public name: string;
    public amount: number;
    public unit: string;

    constructor(config: any) {
        this.updateFromServerData(config);
    }

    updateFromServerData(config: any) {
        this.name = !isNil(config.name) ? config.name : this.name;
        this.amount = !isNil(config.amount) ? config.amount : this.amount;
        this.unit = !isNil(config.unit) ? config.unit : this.unit;

    }
}
