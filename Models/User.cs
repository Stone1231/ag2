using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace ag2.Models
{
    public class User
    {
        public User()
        {
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Hight { get; set; }

        [JsonConverter(typeof(OnlyDateConverter))]
        public DateTime Birthday { get; set; }
        public string Photo { get; set; }

//https://stackoverflow.com/questions/39322085/how-to-save-iformfile-to-disk
        [NotMapped]
        public IFormFile PhotoFile { get; set; }
    }
}