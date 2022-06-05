$(function () {

    //çalışan listesi için tabloya satır-sutun oluşturma

    function BringData(employees) {
        $('#employeeTable').find('tr').remove();  //tabloda tr yi bul ve sil
        $.each(employees, function (index, data) {  //each=>foreach demek.employess içinde dön dönerken her birinin index ve datasını tut 
            $('#employeeTable').append( //idsi employetablo olan yere dahil et
                `<tr>

                    <td>${data.Title}</td>    /* tuttugun datanın ..larını getir*/
                    <td>${data.FirstName}</td>
                    <td>${data.LastName}</td>
                    <td><button class='btn btn-sm btn-danger' value='Delete' id=${data.Id}>Delete</button></td>
                    <td><button class='btn btn-sm btn-warning' value='Update' id=${data.Id}>Update</button></td>

/* buton eklerken mutlaka value ve ıd yazki neye göre alacagını bilsin */

                </tr>`
            )

        })
    }

    //api istek ---çalışan listesini getirme
    $("#getEmployee").click(function () {
        $.ajax({
            method: 'Get',
            url: 'https://localhost:44376/api/employees/GetEmployees',
            success: function (employees) {  /* basarılı oldugunda yukarda yazdıgın bringdatayı getirsin */
                BringData(employees);
            }
        })
    })


    //Çalışan Silme 

    $("#employeeTable").on('click', 'button', function () { /*on => idsi employetablo olanların içerisindeki herseyi temsil eder. elementi buton olanın eventi click oldugunda fonk çalıştır: */
        var currentValue = $(this).attr('value'); /* bunun yani tıklanan butonun attributunu al*/
        var currentId = $(this).attr('id');
        var message = confirm('işlem yapmak istediğinize emin misiniz?')

        if (currentValue == 'Delete') { /* degişkene aldıgın attribute valuesi value olarak yukarıda verdiğinle aynı ise*/
            if (message) {
                $.ajax({
                    method: 'Delete',
                    url: 'https://localhost:44376/api/employees/DeleteEmployee/' + currentId,
                    success: function (employees) {
                        BringData(employees);
                    }
                })
            } else {
                alert('iptal edildi!')
            }
        }

        //çalışan güncelleme

        else if (currentValue == 'Update') {
            var employee = {

                EmployeeID: currentId,     //currentId employe clasındaki atamazsak null olarak getiriyor
                Title: $("#employeetitle").val(),
                FirstName: $("#employeefirstname").val(),
                LastName: $("#employeelastname").val(),
            }

            if (message) {
                $.ajax({
                    method: 'Put',
                    url: 'https://localhost:44376/api/employees/PutUpdate',
                    data: employee,
                    success: function (employees) {
                        BringData(employees);
                    }
                })
            } else {
                alert('iptal edildi!')
            }
        }
    })


    //çalışan ekleme
    $('#btnAddEmployee').click(function () {

        var employee = {
            Title: $("#employeetitle").val(),
            FirstName: $("#employeefirstname").val(),
            LastName: $("#employeelastname").val(),
        }

 
        $.ajax({
            method: 'Post',
            url: 'https://localhost:44376/api/employees/PostAddEmployee',
            data: employee,
            success: function (employees) {
                BringData(employees);
            }

        })

    })


})