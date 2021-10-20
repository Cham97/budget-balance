//read either income or outcome has been clicked
var method = "income"
$(document).ready(function () {
    params = new URLSearchParams(window.location.search)
    method = params.get('method')

    //change the category depending on the expense
    if (method == "income") {
        $("#category").empty()
        $("#category").append("<option>Salary</option>");
        $("#category").append("<option>Others</option>");
    } else if (method == "outcome") {
        $("#category").empty()
        $("#category").append("<option>Shopping</option>");
        $("#category").append("<option>Travel</option>");
        $("#category").append("<option>Food</option>");
        $("#category").append("<option>Others</option>");

    }

    var currentDate = new Date().toJSON().slice(0, 10)

    document.getElementById('date').value = currentDate;
});

//saves the new added Value in local storage so it can be added to overall Budget 
function addValue() {

    if (isValid()) {
        var item = {
            category: document.getElementById("category").value,
            betrag: document.getElementById("amount").value,
            memo: document.getElementById("comments").value,
            transaction: method,
            date: document.getElementById("date").value
        };


        localStorage.setItem('newItem', JSON.stringify(item));


        window.location.href = 'index.html';



    }

}
function isValid() {
    if ($('#amount').val() == '') {
        document.getElementById("alert").innerHTML = " <div class='p-5'><div class='alert alert-danger'><strong>Not Yet!</strong> Please fill all required Data.</div> </div>"
        return false
    } 
    if ($('#date').val() == '') {
        document.getElementById("alert").innerHTML = " <div class='p-5'><div class='alert alert-danger'><strong>Not Yet!</strong> Please fill all required Data.</div> </div>"
        console.log(" >>>>" + $('#date').val())
        return false
        
    }
    return true
}