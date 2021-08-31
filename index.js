// Your code here
function createEmployeeRecord(employeeArr) {

  return {
    firstName: employeeArr[0],
    familyName: employeeArr[1],
    title: employeeArr[2],
    payPerHour: employeeArr[3],
    timeInEvents: [],
    timeOutEvents: []

  }
}

function createEmployeeRecords(employees) {
  return employees.map(function (e) {
    return createEmployeeRecord(e)
  });
}

function createTimeInEvent(employee, timeStamp) {
  let time = timeStamp.slice(-4);
  let date = timeStamp.slice(0, 10);
  /// let time = datetime[1];

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(time),
    date: date
  });

  return employee;
}

function createTimeOutEvent(employee, timeStamp) {
  let time = timeStamp.slice(-4);
  let date = timeStamp.slice(0, 10);
  /// let time = datetime[1];

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(time),
    date: date
  });

  return employee;
}

function hoursWorkedOnDate(employee, timeStamp) {
  let time = timeStamp.slice(-4);
  let date = timeStamp.slice(0, 10);
  let indexDate = getDateIndex(employee, timeStamp);

  return getTimeDiff(employee.timeOutEvents[indexDate].hour, employee.timeInEvents[indexDate].hour)
}

function wagesEarnedOnDate(employee, timeStamp) {
  let index = getDateIndex(employee, timeStamp);

  return hoursWorkedOnDate(employee, timeStamp) * employee.payPerHour;
}

function allWagesFor(employee) {
  return employee.timeOutEvents.reduce(function (total, g) {

    return total + wagesEarnedOnDate(employee, g.date)
  }, 0);

}


function findEmployeeByFirstName(employees, name) {
  return employees.find(function (g) {
    return g.firstName === name;
  })
}

function calculatePayroll(employees) {
  return employees.reduce(function (total, e) {
    return total + allWagesFor(e);
  }, 0)
}












function getDateIndex(employee, timeStamp) {
  let i = employee.timeInEvents.findIndex(function (e) {
    return e.date === timeStamp.slice(0, 10)
  });
  ;
  return i;
}
function getTimeDiff(a, b) {
  return (a - b) / 100

}