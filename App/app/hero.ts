export class Hero {
    id: number;
    name: string;
    image: string;

    public static fromJsonArray(json: any): Hero[] {
        let heroes: Hero[] = new Array<Hero>();
        for (let item of json) {
          let hero: Hero = new Hero();
          hero.id = item.Id;
          hero.name = item.Name;
          hero.image = item.Image;
          heroes.push(hero);
        }
        return heroes;
    }

    public static fromJson(json: any): Hero {
      let heroes = [ json ];
      return Hero.fromJsonArray(heroes)[0];
    }
}
