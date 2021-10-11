export const LIST_VIEW = "List View";
export const CHART_VIEW = "Chart View";
export const INCOME = "Income";
export const EXPENSE = "Expense";

export const ITEM_URL = 'http://localhost:8080/api/items';
export const CATEGORY_URL = 'http://localhost:8080/api/categories';
export const LOGIN_URL = 'http://localhost:8080/api/users';

export const convertFormat = (month) => {
  if (Number.parseInt(month) < 10)
    return "0" + month;
  return month;
}

export const generateYearList = (year) => {
  let number = Number.parseInt(year);
  let yearList = [];

  for (let i = -6; i < 6; i++) {
    var num = (number + i).toString();
    yearList.push(num);
  }
  return yearList;
}

export const generateMonthList = () => {
  let monthList = [];

  for (let index = 1; index < 13; index++) {
    let numString = index.toString();
    monthList.push(convertFormat(numString));
  }

  return monthList;
}

export const getCurrentDate = () => {
  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();
  return {
    year: cYear.toString(),
    month: convertFormat(cMonth),
    day: cDay.toString()
  }
}


export const getItemById = (id, items) => {
  let item = null;
  items.forEach(element => {
    if(element.id === id)
      item = element;
  });
  return item;
}

export const addCategoryToList = (itemList, categoryList) => {
  if(itemList.length == 0 || categoryList.length == 0)
    return [];
  itemList.forEach(item => {
    categoryList.forEach(element => {
      if(item.cid === element.id)
        item.category = element;     
    });
  });
  return itemList; 
}

export const getMonthCategory = (date) =>{
  return date.substring(0, 7);
}

export const getCid = (category) => {
  return category.id;
}

export const generateItemId = () => {
  let randomStr = Math.random().toString();
  return randomStr.substring(2,12);
}

export const itemList = [
  {
    "id": "1",
    "title": "Visit Dunedin",
    "amount": 500,
    "date": "2021-09-04",
    "category": {
      "id": "1",
      "name": "Travel",
      "type": "Expense",
      "icon": "airplane-outline"
    }
  },
  {
    "id": "2",
    "title": "Dine Out",
    "amount": 1500,
    "date": "2021-09-05",
    "category": {
      "id": "2",
      "name": "Dine Out",
      "type": "Expense",
      "icon": "restaurant-outline"
    }
  },
  {
    "id": "3",
    "title": "Dine Out",
    "amount": 1500,
    "date": "2021-08-05",
    "category": {
      "id": "2",
      "name": "Dine Out",
      "type": "Expense",
      "icon": "restaurant-outline"
    }
  },
  {
    "id": "4",
    "title": "Salary",
    "amount": 11000,
    "date": "2021-09-15",
    "category": {
      "id": "3",
      "name": "Salary",
      "type": "Income",
      "icon": "card-outline"
    }
  }
]

export const categoryList = [
  {
    "id": "1",
    "name": "Travel",
    "type": "Expense",
    "icon": "airplane-outline"
  },
  {
    "id": "2",
      "name": "Dine Out",
      "type": "Expense",
      "icon": "restaurant-outline"
  },
  {
    "id": "3",
    "name": "Salary",
    "type": "Income",
    "icon": "card-outline"
  },
  {
    "id": "4",
    "name": "part-time",
    "type": "Income",
    "icon": "wallet-outline"
  },{
    "id": "5",
    "name": "Travel",
    "type": "Expense",
    "icon": "airplane-outline"
  },
  {
    "id": "6",
      "name": "Dine Out",
      "type": "Expense",
      "icon": "restaurant-outline"
  },
  {
    "id": "7",
    "name": "Salary",
    "type": "Income",
    "icon": "card-outline"
  },
  {
    "id": "8",
    "name": "part-time",
    "type": "Income",
    "icon": "wallet-outline"
  },
]