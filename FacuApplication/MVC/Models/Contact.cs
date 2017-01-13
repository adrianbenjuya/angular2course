using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVC.Models {
    public class Contact
    {
        [Key]
        public string Key { get; set; }

        public string Nombre { get; set; }

        public string Telefono { get; set; }

        public DateTime RenderTime { get; set; }
    }
}
