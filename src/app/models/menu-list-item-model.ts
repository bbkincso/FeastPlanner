export class MenuListItem {
    public id: number;
    public userEmail: string;
    public name: string;
    public note: string;
    public recipes: string;

    constructor(userEmail: string,
                name: string,
                note: string,
                recipes: string) {

        // this.id = id;
        this.userEmail = userEmail;
        this.name = name;
        this.note = note;
        this.recipes = recipes;
    }

}
