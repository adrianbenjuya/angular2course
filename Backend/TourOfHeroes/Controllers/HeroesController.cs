using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using TourOfHeroes.Models;
using TourOfHeroes.Models.Api;

namespace TourOfHeroes.Controllers
{
    public class HeroesController : ApiController
    {
        private Context db = new Context();

        // GET: api/Heroes
        public IHttpActionResult GetHeroes(int? start = null, int? offset = null, string orderby = null, string orderdir = null)
        {
            var heroes = new List<HeroDTO>();
            IQueryable<Hero> heroesDb;
            var order = $"{orderby}&{orderdir}";
            switch(order)
            {
                case "name&asc":
                    heroesDb = db.Heroes.OrderBy(h => h.Name);
                    break;

                case "name&desc":
                    heroesDb = db.Heroes.OrderByDescending(h => h.Name);
                    break;

                case "votes&asc":
                    heroesDb = db.Heroes.OrderBy(h => db.Votes.Where(v => v.HeroId == h.Id).Count()).ThenBy(h => h.Id);
                    break;

                case "votes&desc":
                    heroesDb = db.Heroes.OrderByDescending(h => db.Votes.Where(v => v.HeroId == h.Id).Count()).ThenBy(h => h.Id);
                    break;

                case "id&desc":
                    heroesDb = db.Heroes.OrderByDescending(h => h.Id);
                    break;

                case "id&asc":
                default:
                    heroesDb = db.Heroes.OrderBy(h => h.Id);
                    break;
            }

            heroesDb = heroesDb.Skip(start ?? 0).Take(offset ?? db.Heroes.Count());

            foreach (var hero in heroesDb)
            {
                heroes.Add(DTOFactory(hero));
            }

            return Ok(new { data = heroes, total = db.Heroes.Count() });
        }

        // GET: api/Heroes/5
        [ResponseType(typeof(Hero)), ActionName("Get")]
        public IHttpActionResult GetHero(int id)
        {
            Hero hero = db.Heroes.Find(id);
            if (hero == null)
            {
                return NotFound();
            }

            return Ok(DTOFactory(hero));
        }

        // PUT: api/Heroes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutHero(int id, Hero hero)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != hero.Id)
            {
                return BadRequest();
            }

            db.Entry(hero).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HeroExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(hero);
        }

        // POST: api/Heroes
        [ResponseType(typeof(Hero))]
        public IHttpActionResult PostHero(Hero hero)
        {
            if (hero == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Heroes.Add(hero);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = hero.Id }, hero);
        }

        // DELETE: api/Heroes/5
        [ResponseType(typeof(Hero))]
        public IHttpActionResult DeleteHero(int id)
        {
            Hero hero = db.Heroes.Find(id);
            if (hero == null)
            {
                return NotFound();
            }

            db.Heroes.Remove(hero);
            db.SaveChanges();

            return Ok(hero);
        }

        [ActionName("Vote")]
        public IHttpActionResult GetVote(int id)
        {
            Hero hero = db.Heroes.Find(id);
            if (hero == null)
            {
                return NotFound();
            }

            var ip = HttpContext.Current.Request.UserHostAddress;
            var vote = new HeroVote
            {
                Hero = hero,
                IPVote = ip,
            };

            db.Votes.Add(vote);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok(new { votes = db.Votes.Where(v => v.HeroId == id).Count() });
        }

        private HeroDTO DTOFactory(Hero hero)
        {
            var ip = HttpContext.Current.Request.UserHostAddress;
            var votes = db.Votes.Where(v => v.HeroId == hero.Id);

            var dto = new HeroDTO
            {
                Id = hero.Id,
                Name = hero.Name,
                Description = hero.Description,
                Image = hero.Image,
                Votes = votes.Count(),
                AlreadyVoted = votes.FirstOrDefault(v => v.IPVote == ip) != null
            };

            return dto;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HeroExists(int id)
        {
            return db.Heroes.Count(e => e.Id == id) > 0;
        }
    }
}