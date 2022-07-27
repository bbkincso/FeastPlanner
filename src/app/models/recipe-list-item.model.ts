import { isNil } from 'lodash-es';

export class RecipeListItem {

    public title: string;
    public image: string;
    public sourceUrl: string;
    public readyInMinutes: number;

    // constructor(config: any) {
    //     this.updateFromServerData(config);
    // }

    constructor(title, image, sourceUrl, readyInMin) {
        this.title = title;
        this.image = image;
        this.sourceUrl = sourceUrl;
        this.readyInMinutes = readyInMin;
    }

    // updateFromServerData(config: any) {
    //     this.title = !isNil(config.title) ? config.title : this.title;
    //     this.image = !isNil(config.image) ? config.image : this.image;
    //     // this.sourceUrl = !isNil(config.sourceUrl) ? config.sourceUrl : this.sourceUrl;
    //     this.readyInMinutes = !isNil(config.readyInMinutes) ? config.readyInMinutes : this.readyInMinutes;
    // }
}
