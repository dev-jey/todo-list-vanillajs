function RepairList() {
    this.repairs = []
};


RepairList.prototype.addRepair = function (e) {
    e.preventDefault();
    if (document.getElementById('desc').value) {
        this.repairs.unshift({ id: Math.floor(Math.random() * (20000 - 1 + 1) + 1), description: document.getElementById('desc').value, completed: false });
        document.getElementById('desc').value = "";
        shop.get();
    }
}

RepairList.prototype.deleteRepair = function (e, itemId) {
    e.preventDefault();
    var index = this.repairs.map(x => {
        return x.id;
    }).indexOf(itemId);
    this.repairs.splice(index, 1);
    shop.get();
}

RepairList.prototype.markAsComplete = function (itemId) {
    this.repairs.forEach(x => {
        if (x.id === itemId) {
            x.completed = true;
        }
    })
    shop.get();
}

RepairList.prototype.unmarkAsComplete = function (itemId) {
    this.repairs.forEach(x => {
        if (x.id === itemId) {
            x.completed = false;
        }
    })
    shop.get();
}

RepairList.prototype.handleCheckbox = function (e, itemId) {
    e.preventDefault()
    item = this.repairs.filter(i => { return i.id == itemId });
    if (item[0].completed == false) {
        shop.markAsComplete(itemId)
    } else {
        shop.unmarkAsComplete(itemId)
    }
}


RepairList.prototype.clearCompleted = function (e) {
    e.preventDefault();
    this.repairs = this.repairs.filter(e => {
        return e.completed === false;
    })
    shop.get();
}


RepairList.prototype.get = function () {
    itm = document.getElementById("repairlist");
    itm.innerHTML = ""
    this.repairs.forEach(item => {
        var x = `
        <li id="item"  class="list-item ${item.completed ? 'completed' : ''}">
        <div class="view">
          <input class="toggle" type="checkbox" ${item.completed ? 'checked=""' : ''}" onclick="shop.handleCheckbox(event, ${item.id})">
          <label>${item.description}</label>
          <button class="destroy" onclick="shop.deleteRepair(event, ${item.id})"></button>
        </div>
        </li>
        `
        itm.insertAdjacentHTML('beforeend', x);
    })
    return this.repairs;
}
const shop = new RepairList()
