class Transaction {
  readonly amount: number;
  readonly date: Date;
  constructor(amount: number, date: Date) {
    this.amount = amount;
    this.date = date;
  }
}

class Customer {
  readonly name: string;
  readonly id: number;
  readonly transactions: Transaction[];
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
    this.transactions = [];
  }

  getName(): string {
    return this.name;
  }

  getId(): number {
    return this.id;
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  getBalance(): number {
    return this.transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  }

  addTransaction(amount: number): boolean {
    if (amount >= 0) {
      const transaction = new Transaction(amount, new Date());
      this.transactions.push(transaction);
      console.log("Transaction added successfully.");
      return true;
    } else {
      console.log("Transaction rejected. The amount must be > 0.");
      return false;
    }
  }
}

class Branch {
  readonly name: string;
  readonly customers: Customer[];
  constructor(name: string) {
    this.name = name;
    this.customers = [];
  }

  getName(): string {
    return this.name;
  }

  getCustomers(): Customer[] {
    return this.customers;
  }

  addCustomer(customer: Customer): boolean {
    if (!this.customers.includes(customer)) {
      this.customers.push(customer);
      console.log(
        `Customer ${customer.name} with ID: ${customer.id} added successfully.`
      );
      return true;
    } else {
      console.log(
        `Customer ${customer.name} with ID: ${customer.id} already exists.`
      );
      return false;
    }
  }

  addCustomerTransaction(customerId: number, amount: number): boolean {
    const customer = this.customers.find(
      (customer) => customer.id === customerId
    );
    if (customer) {
      console.log(`Customer transaction added successfully.`);
      return customer.addTransaction(amount);
    } else {
      console.log(`This customer does not exist.`);
      return false;
    }
  }
}

class Bank {
  readonly name: string;
  readonly branches: Branch[];
  constructor(name: string) {
    this.name = name;
    this.branches = [];
  }

  addBranch(branch: Branch): boolean {
    if (!this.branches.includes(branch)) {
      this.branches.push(branch);
      console.log(`${branch.name} added successfully.`);
      return true;
    } else {
      console.log(`${branch.name} already exists.`);
      return false;
    }
  }

  addCustomer(branch: Branch, customer: Customer): boolean {
    if (this.branches.includes(branch)) {
      console.log(`${branch.name}:`);
      return branch.addCustomer(customer);
    } else {
      console.log(`${branch.name} this branch does not exist.`);
      return false;
    }
  }

  addCustomerTransaction(
    branch: Branch,
    customerId: number,
    amount: number
  ): boolean {
    if (this.branches.includes(branch)) {
      return branch.addCustomerTransaction(customerId, amount);
    } else {
      return false;
    }
  }

  findBranchByName(branchName: string): Branch | undefined{
    return this.branches.find((branch) => branch.getName() === branchName);
  }

  checkBranch(branch: Branch): boolean {
    return this.branches.includes(branch);
  }

  listCustomers(branch: Branch, includeTransactions: boolean): void {
    const customers = branch.getCustomers();
    console.log(`Customers of ${branch.getName()}:`);
    customers.forEach((customer) => {
      console.log(`- Customer: ${customer.getName()}`);
      if (includeTransactions) {
        const transactions = customer.getTransactions();
        transactions.forEach((transaction) => {
          console.log(
            `  - Transaction: ${transaction.amount} on ${transaction.date}`
          );
        });
      }
    });
  }
}

const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const customer1 = new Customer("John", 1);
const customer2 = new Customer("Anna", 2);
const customer3 = new Customer("John", 3);

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
