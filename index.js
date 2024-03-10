function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(array) {
  console.log(array.map(createEmployeeRecord));
  return array.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10),
  });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10),
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeInEvent = employee.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employee.timeOutEvents.find(
    (event) => event.date === date
  );

  if (timeInEvent && timeOutEvent) {
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  } else {
    return 0;
  }
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  const ratePerHour = employee.payPerHour;
  const wagesEarned = hoursWorked * ratePerHour;
  return wagesEarned;
}

function allWagesFor(employee) {
  let totalWages = 0;
  employee.timeInEvents.forEach((timeInEvent) => {
    const date = timeInEvent.date;
    totalWages += wagesEarnedOnDate(employee, date);
  });
  return totalWages;
}

// function allWagesFor(employee) {
//   let totalWages = 0;
//   employee.timeOutEvents.forEach((timeOutEvent) => {
//     const date = timeOutEvent.date;
//     totalWages += wagesEarnedOnDate(employee, date);
//   });
//   return totalWages;
// }

function calculatePayroll(employees) {
  let totalPayroll = 0;
  employees.forEach((employee) => {
    totalPayroll += allWagesFor(employee);
  });
  return totalPayroll;
}

createEmployeeRecord(["Gray", "Worm", "Security", 1]);
