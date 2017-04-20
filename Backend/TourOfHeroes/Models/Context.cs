using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Data.Entity;
using System.Web;

namespace TourOfHeroes.Models
{
    public class Context : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public Context() : base("name=TourOfHeroesContext")
        {
            Database.SetInitializer(new HerosDbInitializer<Context>());
        }

        private class HerosDbInitializer<T> : DropCreateDatabaseIfModelChanges<Context>
        {
            protected override void Seed(Context context)
            {
                var heroes = new List<Hero> {
                    new Hero
                    {
                        Name = "Spiderman",
                        Image = "https://lumiere-a.akamaihd.net/v1/images/open-uri20150608-27674-zlh902_0530d760.png?region=0%2C0%2C374%2C369"
                    },
                    new Hero
                    {
                        Name = "Wonder Woman",
                        Image = "https://upload.wikimedia.org/wikipedia/en/b/b5/WonderWomanNew52.jpg"
                    },
                    new Hero
                    {
                        Name = "Batman",
                        Image = "https://static-latercera-qa.s3.amazonaws.com/wp-content/uploads/sites/7/20150429/2108594.jpg"
                    },
                    new Hero
                    {
                        Name = "Iron Man",
                        Image = "https://www.google.com.ar/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwiXwLLJpqbSAhUH44MKHU6cBTQQjBwIBA&url=http%3A%2F%2Fcartoonbros.com%2Fwp-content%2Fuploads%2F2016%2F07%2FIron-Man-2.png&psig=AFQjCNG0uliA6jTG8U2f_l3c7rJ_l5xuPQ&ust=1487942135903085"
                    },
                    new Hero
                    {
                        Name = "Superman",
                        Image = "http://www.fortalezadelasoledad.com/imagenes/2016/05/06/Superman-Rebirth-Variant.jpg"
                    },
                    new Hero
                    {
                        Name = "Chuck Norris",
                        Image = "https://www.google.com.ar/search?q=chuck+norris&espv=2&biw=1366&bih=638&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjE1OHopabSAhWK54MKHXzHCb8Q_AUIBigB#imgrc=5PJxeoVtag976M:"
                    },
                    new Hero
                    {
                        Name = "Thor",
                        Image = "https://www.google.com.ar/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwi7q9nhpabSAhVK2oMKHW0ABLUQjBwIBA&url=http%3A%2F%2Fstatic1.comicvine.com%2Fuploads%2Foriginal%2F11119%2F111198813%2F5111937-4237037226-34009.png&psig=AFQjCNFg1B5pGHO_26mzQFPHEIxc-sSDwQ&ust=1487941918095359"
                    },
                    new Hero
                    {
                        Name = "Cyclops",
                        Image = "http://vignette2.wikia.nocookie.net/avengersalliance/images/6/69/Cyclops_Dialogue_3.png/revision/latest?cb=20120921004412"
                    },
                    new Hero
                    {
                        Name = "Luke Skywalker",
                        Image = "http://www.pulsourbano.com.ar/wp-content/uploads/Luke-Skywalker.jpg"
                    }
                };

                context.Heroes.AddRange(heroes);
                base.Seed(context);
            }
        }

        public DbSet<Hero> Heroes { get; set; }
        public DbSet<HeroVote> Votes { get; set; }

    }
}
