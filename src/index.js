var Transaction = /** @class */ (function () {
    function Transaction(amount, date) {
        this.amount = amount;
        this.date = date;
    }
    return Transaction;
}());
var Customer = /** @class */ (function () {
    function Customer(name, id) {
        this.name = name;
        this.id = id;
        this.transactions = [];
    }
    Customer.prototype.getName = function () {
        return this.name;
    };
    Customer.prototype.getId = function () {
        return this.id;
    };
    Customer.prototype.getTransactions = function () {
        return this.transactions;
    };
    Customer.prototype.getBalance = function () {
        return this.transactions.reduce(function (total, transaction) { return total + transaction.amount; }, 0);
    };
    Customer.prototype.addTransaction = function (amount) {
        if (amount >= 0) {
            var transaction = new Transaction(amount, new Date());
            this.transactions.push(transaction);
            console.log("Transaction added successfully.");
            return true;
        }
        else {
            console.log("Transaction rejected. The amount must be > 0.");
            return false;
        }
    };
    return Customer;
}());
var Branch = /** @class */ (function () {
    function Branch(name) {
        this.name = name;
        this.customers = [];
    }
    Branch.prototype.getName = function () {
        return this.name;
    };
    Branch.prototype.getCustomers = function () {
        return this.customers;
    };
    Branch.prototype.addCustomer = function (customer) {
        if (!this.customers.includes(customer)) {
            this.customers.push(customer);
            console.log("Customer ".concat(customer.name, " with ID: ").concat(customer.id, " added successfully."));
            return true;
        }
        else {
            console.log("Customer ".concat(customer.name, " with ID: ").concat(customer.id, " already exists."));
            return false;
        }
    };
    Branch.prototype.addCustomerTransaction = function (customerId, amount) {
        var customer = this.customers.find(function (customer) { return customer.id === customerId; });
        if (customer) {
            console.log("Customer transaction added successfully.");
            return customer.addTransaction(amount);
        }
        else {
            console.log("This customer does not exist.");
            return false;
        }
    };
    return Branch;
}());
var Bank = /** @class */ (function () {
    function Bank(name) {
        this.name = name;
        this.branches = [];
    }
    Bank.prototype.addBranch = function (branch) {
        if (!this.branches.includes(branch)) {
            this.branches.push(branch);
            console.log("".concat(branch.name, " added successfully."));
            return true;
        }
        else {
            console.log("".concat(branch.name, " already exists."));
            return false;
        }
    };
    Bank.prototype.addCustomer = function (branch, customer) {
        if (this.branches.includes(branch)) {
            console.log("".concat(branch.name, ":"));
            return branch.addCustomer(customer);
        }
        else {
            console.log("".concat(branch.name, " this branch does not exist."));
            return false;
        }
    };
    Bank.prototype.addCustomerTransaction = function (branch, customerId, amount) {
        if (this.branches.includes(branch)) {
            return branch.addCustomerTransaction(customerId, amount);
        }
        else {
            return false;
        }
    };
    Bank.prototype.findBranchByName = function (branchName) {
        return this.branches.filter(function (branch) { return branch.getName() === branchName; });
    };
    Bank.prototype.checkBranch = function (branch) {
        return this.branches.includes(branch);
    };
    Bank.prototype.listCustomers = function (branch, includeTransactions) {
        var customers = branch.getCustomers();
        console.log("Customers of ".concat(branch.getName(), ":"));
        customers.forEach(function (customer) {
            console.log("- Customer: ".concat(customer.getName()));
            if (includeTransactions) {
                var transactions = customer.getTransactions();
                transactions.forEach(function (transaction) {
                    console.log("  - Transaction: ".concat(transaction.amount, " on ").concat(transaction.date));
                });
            }
        });
    };
    return Bank;
}());
var arizonaBank = new Bank("Arizona");
var westBranch = new Branch("West Branch");
var sunBranch = new Branch("Sun Branch");
var customer1 = new Customer("John", "1");
var customer2 = new Customer("Anna", "2");
var customer3 = new Customer("John", "3");
arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
arizonaBank.addBranch(westBranch);
arizonaBank.findBranchByName("bank");
arizonaBank.findBranchByName("sun");
arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);
console.log(customer1.getBalance());
console.log(customer1.addTransaction(-1000));
console.log(customer1.getBalance());
console.log(arizonaBank.listCustomers(westBranch, true));
console.log(arizonaBank.listCustomers(sunBranch, true));
