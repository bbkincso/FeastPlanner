export class RecipeListItem {

    public title: string;
    public image: string;
    public sourceUrl: string;
    public readyInMinutes: number;

    // constructor() {
    // }

    constructor(title: string, image: string, sourceUrl: string, readyInMinutes: number) {
        this.title = title;
        this.image = image;
        this.sourceUrl = sourceUrl;
        this.readyInMinutes = readyInMinutes;
    }

}

