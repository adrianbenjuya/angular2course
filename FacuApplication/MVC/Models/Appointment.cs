using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVC.Models {
    public class Appointment {

        public int Id { get; set; }

        public string Title { get; set; }

        public string Address { get; set; }

        public List<Contact> Invitees { get; set; }
    }
}
