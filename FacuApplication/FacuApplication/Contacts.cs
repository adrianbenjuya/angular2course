using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FacuApplication {
    public class Contacts : DbContext {

        public Contacts() : base("DefaultConnection") {

        }

        public virtual DbSet<Contact> ContactSet { get; set; }

        public virtual DbSet<Appointment> AppointmentSet { get; set; }

    }
}
