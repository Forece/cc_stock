// ==UserScript==
// @name         Inventory Schedule Filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Show Uncomplete Stock Count
// @author       Yunpeng Fan
// @match        https://ccms.canadacomputers.com:19090/StockCountSchedule/ScheduleIndex
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Function to send GET request
  async function getInventoryList(TS) {
    const url = `https://ccms.canadacomputers.com:19090/StockCountSchedule/LoadScheduleDefinedCategoryTree?ScheduleNo=${TS}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const filteredCategories = data["Data"].filter((category) => category.ParentId === 0);
      return filteredCategories.length; // Return the length
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getCompleteList(TS) {
    const url = `https://ccms.canadacomputers.com:19090/StockCountSchedule/LoadScheduleWarehouseConvertedCategoryIds?ScheduleNo=${TS}&WarehouseCode=MC`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data["Data"].length; // Return the length
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function main() {
    const tbodyElement = document.querySelector('.dx-datagrid-rowsview tbody[role="presentation"]');
    const trElements = tbodyElement.querySelectorAll("tr");

    for (const element of trElements) {
      const TS = element.childNodes[1].textContent;
      if (!TS) return;

      // Wait for both fetch calls to complete
      const inventoryLength = await getInventoryList(TS);
      const completeLength = await getCompleteList(TS);

      console.log(`${TS}: ${inventoryLength} == ${completeLength}`);

      // Compare lengths
      if (inventoryLength !== completeLength) {
        element.setAttribute("style", "color: red;");
      }
    }
  }

  // Call the main function after a delay
  window.addEventListener("load", () => {
    // Wait an additional 5 seconds before calling main()
    setTimeout(main, 5000);
  });
})();
