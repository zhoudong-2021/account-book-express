import PriceList from '../components/PriceList';
import TotalPrice from '../components/TotalPrice';
import React, { useState, useEffect } from 'react';
import ViewTab from '../components/ViewTab';
import {
  LIST_VIEW, getCurrentDate, EXPENSE, CATEGORY_URL,
  INCOME, addCategoryToList, ITEM_URL, CHART_VIEW,
} from '../utility';
import MonthPicker from '../components/MonthPicker';
import CreateRecords from '../components/CreateRecords';
import withContext from '../WithContext';
import { useHistory } from 'react-router';
import PieCharts from '../components/PieCharts';
import Tabs, { Tab } from '../Tabs';
import Logout from '../components/Logout';

const axios = require('axios');


function Home(props) {

  const cDate = getCurrentDate();
  const tabs = [LIST_VIEW, CHART_VIEW];

  const [year, setYear] = useState(props.data.year.toString());
  const [month, setMonth] = useState(props.data.month.toString());

  // let year = props.data.year;
  // let month = props.data.month;

  const [items, setItems] = useState(null);
  const [view, setView] = useState(LIST_VIEW);

  useEffect(() => {
    async function fetchData() {
      // Initialize items and categories.
      const iUrl = ITEM_URL;
      const cUrl = CATEGORY_URL;
      const datas = await Promise.all([axios.get(cUrl), axios.get(iUrl)]);
      const [categories, items] = datas;
      if(items.data === false){
        history.push("/login");
        items.data = [];
        return;
      }  
      setItems(addCategoryToList(items.data, categories.data));
    }
    fetchData();
  }, []) //Run once only

  const filteredItems = [];
  const history = useHistory();
  let totalIncome = 0;
  let totalExpense = 0;

  if (items != null) {
    items.map(item => {
      let itemYear = item.date.slice(0, 4);
      let itemMonth = item.date.slice(5, 7);

      if (itemYear === year & itemMonth === month) {
        filteredItems.push(item);

        if (item.category.type === INCOME) {
          totalIncome += Number.parseFloat(item.amount);
        }
        else {
          totalExpense += Number.parseFloat(item.amount);
        }
      }
      return null;
    });
  }

  const deleteItem = async (deletedItem) => {
    const url = ITEM_URL + "/" + deletedItem.id;
    await axios.delete(url);
    history.push("/");

    let newItems = items.filter(item => {
      return item.id !== deletedItem.id
    });
    setItems(newItems);
  }

  const getChartsData = (items, filter) => {
    const datas = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].category.type !== filter)
        continue;
      let merge = false;
      for (let j = 0; j < datas.length; j++) {
        if (items[i].category.name === datas[j].name) {
          merge = true;
          datas[j].value += items[i].amount;
        }
      }
      if (merge === false) {
        const data = {
          name: items[i].category.name,
          value: items[i].amount
        }
        datas.push(data);
      }

    }
    return datas;
  }




  return (
    <React.Fragment>
      <Logout />

      <div className="mt-3">
        <div className="d-flex justify-content-around">
          <MonthPicker
            deFaultMonth={month}
            defaultYear={year}
            onChange={(year, month) => {
              // props.data.year = year;
              // props.data.month = month;
              setYear(year);
              setMonth(month);
            }}
          />

          <TotalPrice
            totalExpense={totalExpense}
            totalIncome={totalIncome}
          />
        </div>
      </div>

      <CreateRecords />
      <Tabs tabs={tabs}
        activeTab={view}
        onTabChange={(item) => setView(item)}
      >
        <Tab child={
          <div className="d-flex align-items-center justify-content-center"><ion-icon name="list" ></ion-icon>
            <span className="fs-5 ps-2">List View</span></div>} />
        <Tab child={
          <div className="d-flex align-items-center justify-content-center"><ion-icon name="cellular" ></ion-icon>
            <span className="fs-5 ps-2">Chart View</span></div>} />
      </Tabs>


      {view === LIST_VIEW && filteredItems.length !== 0 &&
        <PriceList
          items={filteredItems}
          onDeleteItem={(item) => { deleteItem(item) }}
        />}

      {view === LIST_VIEW && filteredItems.length === 0 &&
        <div className="alert alert-light text-center fs-5">
          There is no record.
        </div>
      }
      {view !== LIST_VIEW &&
        <PieCharts
          data1={getChartsData(filteredItems, INCOME)}
          data2={getChartsData(filteredItems, EXPENSE)}
        />
      }
    </React.Fragment>

  );
}


export default withContext(Home);

