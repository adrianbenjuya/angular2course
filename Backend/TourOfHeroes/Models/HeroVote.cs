using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TourOfHeroes.Models
{
    public class HeroVote
    {
        public int Id { get; set; }

        public string IPVote { get; set; }

        public int HeroId { get; set; }

        public virtual Hero Hero { get; set; }
    }
}