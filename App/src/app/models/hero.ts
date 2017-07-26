export class Hero {
    id: number;
    name: string;
    image: string;
    votes: number = 0;
    description: string;
    alreadyVoted: boolean = false;
    birthdate: Date;
    voting: String = "";

    public static fromJsonArray(json: any): Hero[] {
        let heroes: Hero[] = new Array<Hero>();
        for (let item of json) {
          let hero: Hero = new Hero();
          hero.id = item.Id;
          hero.name = item.Name;
          hero.description = item.Description;
          hero.image = item.Image;
          hero.votes = item.Votes;
          hero.alreadyVoted = item.AlreadyVoted;
          hero.birthdate = item.Birthdate ? new Date(item.Birthdate) : null;
          heroes.push(hero);
        }
        return heroes;
    }

    public static fromJson(json: any): Hero {
      let heroes = [ json ];
      return Hero.fromJsonArray(heroes)[0];
    }
}
