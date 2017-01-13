using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using FacuApplication;
using System.Collections.Generic;

namespace UnitTestProject1 {
    [TestClass]
    public class UnitTest1 {
        [TestMethod]
        public void TestMethod1() {

            var a = new Contact {
                Name = "Gabriel",
                Phone = "4444-4444",
                Id = 333333
            };

            var b = new Contact {
                Name = "Martín",
                Phone = "6766-6666",
                Id = 444
            };

            var c = new Contact {
                Name = "Fernando",
                Phone = "4545-4545",
                Id = 5456
            };

            var context = new Contacts();

            context.ContactSet.Add(a);
            context.ContactSet.Add(b);
            context.ContactSet.Add(c);

            var d = new Appointment {
                Id = 1,
                Address = "mi casa",
                Title = "éste appointment",
                Invitees = new List<Contact> { a, b }
            };

            var e = new Appointment {
                Id = 2,
                Address = "mi otra casa",
                Title = "este otro appointment",
                Invitees = new List<Contact> { b, c }
            };

            context.AppointmentSet.Add(d);
            context.AppointmentSet.Add(e);

            context.SaveChanges();
        }
    }
}
