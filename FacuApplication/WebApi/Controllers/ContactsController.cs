using System.Data;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.OData;
using FacuApplication;

namespace WebApi.Controllers {
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using FacuApplication;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Contact>("Contacts");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class ContactsController : ODataController
    {
        private Contacts db = new Contacts();

        // GET: odata/Contacts
        [EnableQuery]
        public IQueryable<Contact> GetContacts()
        {
            return db.ContactSet;
        }

        // GET: odata/Contacts(5)
        [EnableQuery]
        public SingleResult<Contact> GetContact([FromODataUri] int key)
        {
            return SingleResult.Create(db.ContactSet.Where(contact => contact.Id == key));
        }

        // PUT: odata/Contacts(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Contact> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Contact contact = db.ContactSet.Find(key);
            if (contact == null)
            {
                return NotFound();
            }

            patch.Put(contact);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(contact);
        }

        // POST: odata/Contacts
        public IHttpActionResult Post(Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ContactSet.Add(contact);
            db.SaveChanges();

            return Created(contact);
        }

        // PATCH: odata/Contacts(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Contact> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Contact contact = db.ContactSet.Find(key);
            if (contact == null)
            {
                return NotFound();
            }

            patch.Patch(contact);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(contact);
        }

        // DELETE: odata/Contacts(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Contact contact = db.ContactSet.Find(key);
            if (contact == null)
            {
                return NotFound();
            }

            db.ContactSet.Remove(contact);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContactExists(int key)
        {
            return db.ContactSet.Count(e => e.Id == key) > 0;
        }
    }
}
