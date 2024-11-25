// Wishlist: Responsive wordspacing

const item = document.querySelector("[name='item']")
const price = document.querySelector("[name='price']")
const historyList = document.getElementById("historyList")
const form = document.querySelector("form")

function onload() {
        if (!(localStorage.getItem("recordHistory") === null)) {
                getRecord()
        }
}
onload()

function log (itemLabel, itemPrice) {
        if (item.value && price.value) {
                let currentTime = getTime()
                listRecordHistory(currentTime, itemLabel, itemPrice)

                item.value = ""
                price.value = ""

                saveRecord()
        }
}

function undo() {
        historyList.removeChild(historyList.firstElementChild)
        saveRecord()
}

function listRecordHistory(time, item, price) {
        const li = document.createElement("li")
        li.textContent = `${time} - ${item} - Php ${price}`
        historyList.prepend(li)
}

function addToList(record) {
        const li = document.createElement("li")
        li.textContent = record
        historyList.prepend(li)
}

function saveRecord() {
        const recordData = []
        let list = document.querySelectorAll("li")
        list.forEach(record => {
                recordData.unshift(record.textContent)
        })
        localStorage.setItem("recordHistory", JSON.stringify(recordData))
}

function getRecord() {
        const recordHistory = JSON.parse(localStorage.getItem("recordHistory"))
        recordHistory.forEach(addToList)
}

function getTime() {
        const date = new Date()
        let hour = date.getHours()
        let minute = date.getMinutes()

        if (minute < 10) {
                minute = `0${minute}`
        }

        let past12 = hour > 12
        if (past12) {
                hour -= 12
                return `${hour}:${minute} pm`
        }
        return `${hour}:${minute} am`
}

form.onsubmit = (event) => {
        event.preventDefault()
        log(item.value, price.value)
}