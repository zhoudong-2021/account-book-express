import React, { useEffect, useState } from 'react';
import {
  LIST_VIEW, CHART_VIEW, addCategoryToList, INCOME,
  EXPENSE, getItemById, itemList, num, generateItemId, getMonthCategory, getCid, ITEM_URL, CATEGORY_URL
} from '../utility';
import CategoryList from '../components/CategoryList';
import InputForm from '../components/InputForm';
import AlertMessage from '../components/AlertMessage';
import { useHistory } from 'react-router-dom';
import withContext from '../WithContext';
import Tabs, { Tab } from '../Tabs';
const axios = require('axios')

function Create({data, match}) {

  const [categoryList, setCategoryList] = useState(null);
  const [categoryType, setCategoryType] = useState(EXPENSE);
  const [category, setCategory] = useState(null);
  const [message, setMessage] = useState(null);
  const [item, setItem] = useState(null);

  const iUrl = ITEM_URL;
  const cUrl = CATEGORY_URL;
  const tabs = [INCOME, EXPENSE];
  useEffect(() => {
    async function fetchData() {
      // Initialize items and categories.

      const datas = await Promise.all([axios.get(cUrl), axios.get(iUrl)]);
      let [categories, itemsList] = datas;
      itemsList = addCategoryToList(itemsList.data, categories.data);
      setCategoryList(categories.data);

      let id = match.params.id;
      let item = getItemById(id, itemsList);

      if (item != null) {
        setItem(item);
        setCategoryType(item.category.type);
        setCategory(item.category);
      }
    }
    fetchData();
  }, []) //Only run once

  let history = useHistory();

  const getCategoryList = () => {
    let filteredCategories = [];
    if (categoryList != null) {
      categoryList.forEach(item => {
        if (item.type === categoryType)
          filteredCategories.push(item);
      });
    }
    return filteredCategories;
  }


  const handleSubmit = (title, amount, date) => {
    if (!(title && amount && date && category)) {
      setMessage("All fields must be filled.");
      return;

    }
    setMessage(null);
    // Crate a new item
    let id = generateItemId();
    let monthCategory = getMonthCategory(date);
    let cid = getCid(category);
    let newItem = { title, amount, date, id, monthCategory, cid }
    data.year = monthCategory.substring(0,4);
    data.month = monthCategory.substring(5,7);
  

    // Check whether Post or Put method.
    if (item != null) {
      // PUT to update an item
      newItem.id = item.id;
      updateItem(newItem);
      return;
    }
    //Post to create a new item
    addItem(newItem);
  }

  // PUT method
  const updateItem = async (item) => {
    const url = iUrl + "/" + item.id;
    await axios.put(url, item);
    history.push("/");
  }

  // POST method
  const addItem = async (item) => {
    await axios.post(iUrl, item);
    history.push("/");
  }

  return (
    <React.Fragment>
      <Tabs tabs={tabs}
        activeTab={categoryType}
        onTabChange={(type) => setCategoryType(type)}
      >
        <Tab child={
          <div className="d-flex align-items-center justify-content-center">
            <ion-icon name="logo-alipay"></ion-icon>
            <span className="fs-5 ps-2">Income</span></div>
        } />
        <Tab child={
          <div className="d-flex align-items-center justify-content-center">
            <ion-icon name="card"></ion-icon>
            <span className="fs-5 ps-2">Expense</span></div>
        } />
      </Tabs>


      <CategoryList
        categoryList={getCategoryList()}
        selectedCategory={category}
        onChange={(item) => { setCategory(item) }}
      />

      <InputForm
        item={item}
        onChange={(title, amount, date) => handleSubmit(title, amount, date)}
      />

      <AlertMessage
        message={message}
      />
    </React.Fragment>
  )
}

export default withContext(Create);




