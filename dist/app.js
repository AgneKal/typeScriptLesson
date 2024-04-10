"use strict";
const names = document.getElementById('name');
const surnames = document.getElementById('surname');
const salaries = document.getElementById('salary');
const submitBtn = document.getElementById('submit');
const employeesList = document.getElementById('employeesList');
class Employee {
    constructor(name, surname, salary) {
        this._gpm_rate = 0.2;
        this._psd_rate = 0.0698;
        this._vsd_rate = 0.1252;
        this._name = name;
        this._surname = surname;
        this._salary = salary;
    }
    set name(n) {
        this._name = n;
    }
    set surname(s) {
        this._surname = s;
    }
    set salary(l) {
        this._salary = l;
    }
    get name() {
        return this._name;
    }
    get surname() {
        return this._surname;
    }
    get salary() {
        return this._salary;
    }
    gpm() {
        return Number((this._salary * this._gpm_rate).toFixed(2));
    }
    psd() {
        return Number((this._salary * this._psd_rate).toFixed(2));
    }
    vsd() {
        return Number((this._salary * this._vsd_rate).toFixed(2));
    }
    toObject() {
        return {
            name: this._name,
            surname: this._surname,
            salary: this._salary,
            gpm: this.gpm(),
            psd: this.psd(),
            vsd: this.vsd(),
        };
    }
}
const emp = [];
emp.push(new Employee('Jonas', 'Jonaitis', 2000));
emp.push(new Employee('Petras', 'Petraitis', 1800));
emp.push(new Employee('Marytė', 'Melnikaitė', 3000));
emp.forEach((e) => {
    const employee = e.toObject();
    const employeeString = `${employee.name} ${employee.surname}, ${employee.salary.toLocaleString()} (GPM: ${employee.gpm.toLocaleString()}; PSD: ${employee.psd.toLocaleString()}; VSD: ${employee.vsd.toLocaleString()}).`;
    console.log(employeeString);
});
const employees = [];
submitBtn.onclick = () => {
    const name = names.value;
    const surname = surnames.value;
    const salary = salaries.valueAsNumber;
    employees.push(new Employee(name, surname, salary));
    employeesList.innerHTML = '';
    employees.forEach((e, i) => {
        const employee = e.toObject();
        const employeeString = `${employee.name} ${employee.surname}, ${employee.salary.toLocaleString()} (GPM: ${employee.gpm.toLocaleString()}; PSD: ${employee.psd.toLocaleString()}; VSD: ${employee.vsd.toLocaleString()}).`;
        const li = document.createElement('li');
        li.innerHTML = employeeString;
        employeesList.appendChild(li);
        const btn = document.createElement('button');
        li.appendChild(btn);
        btn.innerHTML = 'Delete';
        btn.onclick = () => {
            li.remove();
            delete employees[i];
        };
    });
};
