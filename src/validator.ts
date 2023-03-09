interface IRes {
  isValid: boolean;
  reqMessage: string;
}
export const ageIsValid = (age: number): IRes => {
  const res = {
    isValid: false,
    reqMessage: "",
  };

  if (!isNaN(age) && age > 0) {
    res.isValid = true;
    return res;
  }
  res.isValid = false;
  res.reqMessage = "Age is incorrect";
  return res;
};
export const nameIsValid = (name: string): IRes => {
  const res = {
    isValid: false,
    reqMessage: "",
  };
  if (
    typeof name === "string" &&
    name.length > 1 &&
    name.match(/[a-zA-Z]/g).length === name.length
  ) {
    res.isValid = true;
    return res;
  }
  res.isValid = false;
  res.reqMessage = "Name is incorrect";
  return res;
};
export const genderIsValid = (gender: string): IRes => {
  const res = {
    isValid: false,
    reqMessage: "",
  };
  if (gender === "male" || gender === "female" || gender === "mixed") {
    res.isValid = true;
    return res;
  }
  res.isValid = false;
  res.reqMessage = "Gender is incorrect";
  return res;
};
