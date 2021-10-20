var allItems = []
var showenItems = [] // filtered items.

//Dummy Data
var item1 = {
  category: "Salary",
  betrag: 2000,
  date: "2020-09-01",
  memo: "Lohn gehalt",
  transaction: "income"
};
var item2 = {
  category: "Others",
  betrag: 20,
  date: "2021-09-01",
  memo: "eBay",
  transaction: "income"
};
var item3 = {
  category: "Food",
  betrag: 60,
  date: "2021-10-01",
  memo: "REWE",
  transaction: "outcome"
};


allItems.push(item1)
allItems.push(item2)
allItems.push(item3)

showenItems = allItems.slice();

$(document).ready(function () {

  //read the new Item
  var item = localStorage.getItem('newItem')
  item = JSON.parse(item);

  if (item != null) {
    allItems = localStorage.getItem('allItems') || '[]'; //new Array is saved on the local Storage
    allItems = JSON.parse(allItems);
    allItems.push(item)
    showenItems = allItems.slice();

    refreshData(showenItems)

    localStorage.setItem('newItem', null);
  } else {
    //for inial Load without new Values
    allItems = localStorage.getItem('allItems') || JSON.stringify(allItems);

    allItems = JSON.parse(allItems);

    refreshData(allItems)

  }
  localStorage.setItem('allItems', JSON.stringify(allItems));

  //indicate if the filter is changed and call the filtering function
  $('#type').on('change', function () {

    filter(this.value)

  });
  $('#year').on('change', function () {
    filter(this.value)
  });

  $('#month').on('change', function () {
    filter(this.value)

  });

});


function filter(value) {
  if (value == "Any") { //return Value to its inial Stage
    showenItems = allItems.slice();
    refreshData(showenItems)
  }
  var isTypeSelected = $('#type :selected').text() != "Any"
  var isYearSelected = $('#year :selected').text() != "Any"
  var isMonthSelected = $('#month :selected').text() != "Any"
  
  showenItems = allItems.slice(); //Preparing the new Array

  if (isTypeSelected

  ) {
    showenItems = filterRecords(showenItems, "type", document.getElementById("type").value)


  }
  if (isYearSelected
  ) {
    showenItems = filterRecords(showenItems, "year", document.getElementById("year").value)

  }
  if (isMonthSelected
  ) {
    showenItems = filterRecords(showenItems, "month", document.getElementById("month").value)
  }
  refreshData(showenItems)


}

//Pushing Filtered Data in the filtered Table
function filterRecords(records, filterType, filterValue) {

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  var filteredData = []

  Array.prototype.forEach.call(records, element => {

    // here i take the date from the record.
    var itemDate = Date.parse(element.date)
    // here convert the date from string to Date object
    const d = new Date(itemDate);
    // the magic is here. d.getMonth() = 9.. so I need to map (9, to Septamber)
    var itemMonthName = monthNames[d.getMonth()]
    var itemYear = d.getFullYear()

    if (filterType == "month") {
      if (itemMonthName == filterValue) {
        filteredData.push(element)
      }
    } else if (filterType == "year") {
      if (itemYear == filterValue) {
        filteredData.push(element)
      }
    } else if (filterType == "type") {
      if (element.transaction == filterValue) {
        filteredData.push(element)
      }
    }
  });

  return filteredData;

}


function refreshData(records) {

  //for each Load the Sum of the Categories will be calculated
  var salarySum = 0
  var shoppingSum = 0
  var travelSum = 0
  var foodSum = 0
  var incomeOtherSum = 0
  var outcomeOtherSum = 0
  Array.prototype.forEach.call(records, item => {


    if (item.category == "Salary") {
      salarySum += parseInt(item.betrag)
    } else if (item.category == "Shopping") {
      shoppingSum += parseInt(item.betrag)
    } else if (item.category == "Travel") {
      travelSum += parseInt(item.betrag)
    } else if (item.category == "Food") {
      foodSum += parseInt(item.betrag)
    } else if (item.category == "Others" && item.transaction == "income") {
      incomeOtherSum += parseInt(item.betrag)
    } else if (item.category == "Others" && item.transaction == "outcome") {
      outcomeOtherSum += parseInt(item.betrag)

    }
  })

  $('#SalaryValue').html(salarySum);
  $('#shoppingValue').html(shoppingSum);
  $('#travelValue').html(travelSum);
  $('#foodValue').html(foodSum);
  $('#incomeOtherValue').html(incomeOtherSum);
  $('#outcomeOtherValue').html(outcomeOtherSum);


//Build the Intial Table and the add Items
  var table = document.getElementById("myTable");

  $("#myTable tr").remove();


  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  cell1.innerHTML = "<b>Transaction</b>";
  cell2.innerHTML = "<b>Category</b>";
  cell3.innerHTML = "<b>Betrag</b>";
  cell4.innerHTML = "<b>Memo</b>";
  cell5.innerHTML = "<b>Date</b>";



  Array.prototype.forEach.call(records, item => {

    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = item.transaction;
    cell2.innerHTML = item.category;
    cell3.innerHTML = item.betrag;
    cell4.innerHTML = item.memo;
    cell5.innerHTML = germanFormatDate(item.date);
    if (item.transaction == "income") {
      cell3.innerHTML = "<span style='color:green'> +" + item.betrag + "€</span>";
    } else {
      cell3.innerHTML = "<span style='color:red'> -" + item.betrag + "€</span>";
    }

  });


}


//Turn Data to dd.mm.yyyy
function germanFormatDate(date) {
  var itemDate = Date.parse(date)
  const d = new Date(itemDate)

  day = d.getDate()
  month = d.getMonth()
  month = month + 1;
  if ((String(day)).length == 1)
    day = '0' + day;
  if ((String(month)).length == 1)
    month = '0' + month;

  dateT = day + '.' + month + '.' + d.getFullYear();

  return dateT
}



function reset() {
  localStorage.clear();
  location.reload();




}