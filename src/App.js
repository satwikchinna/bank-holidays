import moment from "moment";
import React, { useState, useEffect } from "react";
import { bankHolidays } from "./bank-holidays";
import DatePicker from "react-datepicker";

import "./App.css";

function App() {
  const [data, setData] = useState(bankHolidays["england-and-wales"].events);
  const [region, setRegion] = useState("england-and-wales");
  const [filter, setFilter] = useState(true);
  const [custom, setCustom] = useState(false);
  useEffect(() => {});
  function handleRegionChange(e) {
    setRegion(e.target.value);
    setFilter(true);
    setCustom(false)
    setData(bankHolidays[e.target.value].events);
  }
  function filterByDateRange(){
    const startDate = moment(document.getElementById("startDate").value)
    const endDate = moment(document.getElementById("endDate").value)
 if(startDate.isValid() && endDate.isValid()){
  const customData = bankHolidays[region].events.filter(function (el) {
    return moment(el.date).isBetween(
     startDate,
      endDate
    );
  });
  setData(customData);
 }else{
   alert("Please select start and end dates")
 }

  }
  function handleFilterChange(e) {
    setFilter(false);
    switch (e.target.value) {
      case "all":
        setData(bankHolidays[region].events);
        break;
      case "last-week":
        const lastWeekData = bankHolidays[region].events.filter(function (el) {
          return moment(el.date).isBetween(
            moment().subtract(6, "days"),
            moment(new Date())
          );
        });
        setData(lastWeekData);
        break;
      case "last-month":
        const lastMonthData = bankHolidays[region].events.filter(function (el) {
          return moment(el.date).isBetween(
            moment().subtract(1, "month").startOf("month"),
            moment().subtract(1, "month").endOf("month")
          );
        });
        setData(lastMonthData);
        break;
      case "last-year":
        const lastYearData = bankHolidays[region].events.filter(function (el) {
          return moment(el.date).isBetween(
            moment().subtract(1, "year").startOf("year"),
            moment().subtract(1, "year").endOf("year")
          );
        });
        setData(lastYearData);
        break;
      default:
        setCustom(true)
    }
  }
  return (
    <div className="App">
      <div className="stock-container">


        <div class="child inline-block-child">
          <select
            defaultValue="ENGLAND AND WHALES"
            onChange={handleRegionChange}
          >
            <option value="england-and-wales">ENGLAND AND WHALES</option>
            <option value="scotland">SCOTLAND</option>
            <option value="northern-ireland">NORTHERN IRELAND</option>
          </select>
        </div>


        <div class="child inline-block-child">
          <select defaultValue={filter} onChange={handleFilterChange}>
            <option selected={filter} value="all">
              ALL
            </option>
            <option value="last-week">LAST WEEK</option>
            <option value="last-month">LAST MONTH</option>
            <option value="last-year">LAST YEAR</option>
            <option value="custom">CUSTOM</option>
          </select>
        </div>

<div style={{visibility: custom ? 'visible' : 'hidden' }}>
        <div class="child inline-block-child">
        <label for="startDate">Start Date:</label>
<input type="date" id="startDate" name="startDate"/>
        </div>
        <div class="child inline-block-child">
        <label for="endDate">End Date:</label>
<input type="date" id="endDate" name="endDate"/>
        </div>
        <div class="child inline-block-child">
       
<input type="submit" onClick={filterByDateRange}/></div>
        </div>
        <table>
          <tr>
            <th>TITLE</th>
            <th>DATE</th>
            <th>NOTES</th>
          </tr>
          {data.map((data, key) => {
            return (
              <tr key={key}>
                <td>{data.title}</td>
                <td>{data.date}</td>
                <td>{data.notes}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default App;
