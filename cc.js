// ==UserScript==
// @name         Stock Level Check for Canada Computers Website
// @namespace    None
// @version      1.1.1
// @description  Stock Level Check for Canada Computers Website
// @author       Yunpeng
// @match        https://www.canadacomputers.com/index.php?cPath=*
// @include      https://www.canadacomputers.com/search/results_details.php?*
// @include      https://www.canadacomputers.com/listing/*
// @grant        none
// ==/UserScript==

// Default StoreName
// West Island
// Modify quebec_stores_list selector to change province
// Modify storeName and num selector to change store

(function () {
  window.addEventListener("load", getStockLevel);
  window.addEventListener("scroll", getStockLevel);

  function getStockLevel() {
    var str = "";
    var stocklevel_all = document.querySelectorAll(".stocklevel-pop");

    for (var i = 0; i <= stocklevel_all.length; i++) {
      var quebec_stores_list = stocklevel_all[i].querySelector(
        ".row:nth-child(5)"
      );
      var storeName = quebec_stores_list.querySelector(
        ".col-md-4:nth-child(7) .col-9 p a"
      ).innerText;
      var num = quebec_stores_list.querySelector(
        ".col-md-4:nth-child(7) .col-3 p span"
      ).innerText;
      // add style
      num = num != "-" ? num : "0";
      if (num != "0") {
        str =
          '<span style="background-color:#CCCCCC;">' +
          storeName +
          ": " +
          num +
          "</span>";
      } else {
        str =
          '<span style="background-color:#FF0000;">' +
          storeName +
          ": " +
          0 +
          "</span>";
      }
      // insert to content
      var insertDiv = document.querySelectorAll("a[data-stocklevel-pop-id]");
      if (insertDiv[i].innerHTML.indexOf("span") == -1) {
        insertDiv[i].innerHTML = str + insertDiv[i].innerHTML;
      }
    }
  }
})();
