using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi_Crud.Models.DTO
{
    public class EmployeeDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
    }
}