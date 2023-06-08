
export const capitalize = (str) => {
  if (str) {
    str = str.split(" ");
    for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
  }
};

export const isEmpty = (obj) => Object.keys(obj).length === 0;

export const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN"
});

export const number = new Intl.NumberFormat("en-NG", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export const calculatePercentage = (item) => {
    const Tasks = item?.tasks
    const completed = Tasks?.filter(item => item.status === true);
    return (completed?.length / Tasks?.length) * 100
}
export const calculateCausePercentage = (item) => {
    return (item?.amount_raised / item?.target) * 100
}

export const capital_validation = /^(?=.*[A-Z])/
export const small_validation = /^(?=.*[a-z])/
export const number_validation = /^(?=.*[0-9])/
