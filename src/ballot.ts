export class Ballot {
    
    owner: String;
    choices: String[];

    constructor (owner: String, choices: String[]) {
        this.owner = owner;
        this.choices = choices;
    }
}