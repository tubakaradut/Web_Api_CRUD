using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi_Crud.Models;
using WebApi_Crud.Models.DTO;

namespace WebApi_Crud.Controllers
{
    public class EmployeesController : ApiController
    {
        NORTHWNDEntities db = new NORTHWNDEntities();


        //çalışanları listeleme
        public List<EmployeeDTO> EmployeeList()
        {
            var employees = db.Employees.Select(x => new EmployeeDTO
            {
                Id = x.EmployeeID,
                Title = x.Title,
                FirstName = x.FirstName,
                LastName = x.LastName
            }).ToList();
            return employees;
        }



        //çalışanları getirme
        public IHttpActionResult GetEmployees()
        {
            return Json(EmployeeList());
        }



        //çalışan silme

        [HttpDelete]
        public IHttpActionResult DeleteEmployee(int id)
        {
            var employee = db.Employees.Find(id);
            if (employee != null)
            {
                db.Employees.Remove(employee);
                db.SaveChanges();
                return Json(EmployeeList());
            }
            else
            {
                return BadRequest();
            }
        }


        //çalışan ekleme
        [HttpPost]
        public IHttpActionResult PostAddEmployee(Employee employee)
        {
            try
            {
                if (employee != null)
                {
                    db.Employees.Add(employee);
                    db.SaveChanges();
                    return Json(EmployeeList());
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {

                return Json(ex.Message);
            }
        }

        [HttpPut]

        public IHttpActionResult PutUpdate(Employee employee)
        {
            Employee updated = db.Employees.Find(employee.EmployeeID);

            //if (updated == null)
            //{
            //    return BadRequest();
            //}
            //else
            //{
            //    updated.Title = employee.Title;
            //    updated.FirstName = employee.FirstName;
            //    updated.LastName = employee.LastName;
            //    db.SaveChanges();
            //    return Json(EmployeeList());

            //}

            //diğer yol
            db.Entry(updated).CurrentValues.SetValues(employee);
            db.SaveChanges();

            return Json(EmployeeList());
        }
    }
}
