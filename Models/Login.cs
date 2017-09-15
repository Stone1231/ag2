using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace ag2.Models
{
    public class Login
    {
        public string Username { get; set; }
        public string Password { get; set; }

    }
}