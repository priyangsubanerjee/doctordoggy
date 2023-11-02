const calculateAge = (dateOfBirth, presentDate) => {
  let dob = new Date(dateOfBirth);
  var dobYear = dob.getYear();
  var dobMonth = dob.getMonth();
  var dobDate = dob.getDate();

  var now = presentDate ? new Date(presentDate) : new Date();
  var currentYear = now.getYear();
  var currentMonth = now.getMonth();
  var currentDate = now.getDate();

  var age = {};
  var ageString = "";

  let yearAge = currentYear - dobYear;

  if (currentMonth >= dobMonth) var monthAge = currentMonth - dobMonth;
  else {
    yearAge--;
    var monthAge = 12 + currentMonth - dobMonth;
  }

  if (currentDate >= dobDate) var dateAge = currentDate - dobDate;
  else {
    monthAge--;
    var dateAge = 31 + currentDate - dobDate;

    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }

  age = {
    yrs: yearAge,
    mth: monthAge,
    days: dateAge,
  };

  if (age.yrs > 0 && age.mth > 0 && age.days > 0)
    ageString = age.yrs + "." + age.mth + " yrs, and " + age.days + " days";
  else if (age.yrs == 0 && age.mth == 0 && age.days > 0)
    ageString = age.days + " days";
  else if (age.yrs > 0 && age.mth == 0 && age.days == 0)
    ageString = age.yrs + " yrs";
  else if (age.yrs > 0 && age.mth > 0 && age.days == 0)
    ageString = age.yrs + "." + age.mth + " yrs";
  else if (age.yrs == 0 && age.mth > 0 && age.days > 0)
    ageString = age.mth + " month & " + age.days + " days.";
  else if (age.yrs > 0 && age.mth == 0 && age.days > 0)
    ageString = age.yrs + " yrs, &" + age.days + " days old.";
  else if (age.yrs == 0 && age.mth > 0 && age.days == 0)
    ageString = age.mth + " month.";
  else ageString = "It's first day on 🌎";

  //display the calculated age
  return ageString;
};

export default calculateAge;
