using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Skupina : Entitet
    {
        public string Naziv { get; set; } = "";

        public string Prostorija { get; set; } = "";


    }
}
