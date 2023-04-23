// ==UserScript==
// @name         Bin Discrepancies Checking
// @namespace    None
// @version      0.1
// @description  Bin Discrepancies Checking
// @author       Yunpeng
// @match        https://ccms.canadacomputers.com:19090/Home/Index*
// @match        https://ccms.canadacomputers.com:19090/Inventory/*
// @grant        none
// ==/UserScript==

(function () {
    window.addEventListener("load", checkDescreancies);

    var ifr = document.querySelectorAll("iframe")
    ifr.forEach((element) => {
        element.addEventListener("load", checkDescreancies)
    })

    function checkDescreancies() {
        setTimeout(() => {
            var row = document.querySelectorAll(".datagrid-view2 .datagrid-row")
            row.forEach(element => {
                // var binCount = element.querySelector("td:nth-child(6)")
                // var ohCount = element.querySelector("td:nth-child(7)")
                var binCount = element.querySelector("td[field='StoredQty']")
                var ohCount = element.querySelector("td[field='OHQty']")
                if (binCount.innerText != ohCount.innerText) {
                    element.style.backgroundColor = 'red'
                }
            });
        }, 2000);
    }
})();