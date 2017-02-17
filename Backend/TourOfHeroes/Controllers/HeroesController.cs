using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using TourOfHeroes.Models;

namespace TourOfHeroes.Controllers
{
    public class HeroesController : ApiController
    {
        private Context db = new Context();

        // GET: api/Heroes
        public IQueryable<Hero> GetHeroes()
        {
            return db.Heroes;
        }

        // GET: api/Heroes/5
        [ResponseType(typeof(Hero))]
        public IHttpActionResult GetHero(int id)
        {
            Hero hero = db.Heroes.Find(id);
            if (hero == null)
            {
                return NotFound();
            }

            return Ok(hero);
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

            return StatusCode(HttpStatusCode.NoContent);
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