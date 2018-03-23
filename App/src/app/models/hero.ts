export class Hero {
    id: number;
    name: string;
    image: string;
    votes = 0;
    description: string;
    alreadyVoted = false;
    birthdate: Date;
    voting: String = '';

    public static fromJsonArray(json: any): Hero[] {
        const heroes: Hero[] = new Array<Hero>();
        for (const item of json) {
          const hero: Hero = new Hero();
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
      const heroes = [ json ];
      return Hero.fromJsonArray(heroes)[0];
    }
}
