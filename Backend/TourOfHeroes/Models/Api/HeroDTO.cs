using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TourOfHeroes.Models.Api
{
    public class HeroDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public int Votes { get; set; }

        public bool AlreadyVoted { get; set; }
    }
}