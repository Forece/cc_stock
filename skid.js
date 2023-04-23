// ==UserScript==
// @name         Skid Discrepancies Checking
// @namespace    None
// @version      0.1
// @description  Check Descrepancies after confirm the skid
// @author       Yunpeng
// @match        https://ccms.canadacomputers.com:19090/Home/Index*
// @match        https://ccms.canadacomputers.com:19090/SkidTransfer/*
// @grant        none
// ==/UserScript==

(function () {
    window.addEventListener("load", checkDescreancies);

    var ifr = document.querySelectorAll("iframe")
    ifr.forEach((element) => {
        element.addEventListener("load", checkDescreancies)
        checkDescreancies()
    })

    function checkDescreancies() {
        setTimeout(() => {
            var row = document.querySelectorAll(".datagrid-view2 .datagrid-row")
            row.forEach(element => {
                // var binCount = element.querySelector("td:nth-child(6)")
                // var ohCount = element.querySelector("td:nth-child(7)")
                var binCount = element.querySelector("td[field='TransferQty']")
                var ohCount = element.querySelector("td[field='ConfirmQty']")
                if (binCount.innerText != ohCount.innerText) {
                    element.style.backgroundColor = 'red'
                }
            });
        }, 2000);
    }
})();