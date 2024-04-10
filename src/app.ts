const names = <HTMLInputElement>document.getElementById('name');
const surnames = <HTMLInputElement>document.getElementById('surname');
const salaries = <HTMLInputElement>document.getElementById('salary');

const submitBtn = document.getElementById('submit')!;
const employeesList =<HTMLUListElement> document.getElementById('employeesList');

class Employee {
        private _name:string;
        private _surname:string;
        private _salary:number;
        private _gpm_rate:number = 0.2;
        private _psd_rate:number = 0.0698;
        private _vsd_rate:number = 0.1252;
    constructor (name:string, surname:string, salary:number,
    ) {
        this._name = name;
        this._surname = surname;
        this._salary = salary;
    }

    set name(n:string) {
        this._name = n;
    }

    set surname(s:string) {
        this._surname = s;
    }

    set salary(l:number) {
        this._salary = l;
    }

    get name():string {
        return this._name;
    }

    get surname():string {
        return this._surname;
    }

    get salary():number {
        return this._salary;
    }
    
    private gpm():number {
        return Number((this._salary*this._gpm_rate).toFixed(2));
    }
    
    private psd():number {
        return Number((this._salary*this._psd_rate).toFixed(2));
    }

    private vsd():number {
        return Number((this._salary*this._vsd_rate).toFixed(2));
    }

    public toObject() {
        return {
            name: this._name, 
            surname: this._surname,
            salary: this._salary,
            gpm: this.gpm(),
            psd: this.psd(),
            vsd: this.vsd(),
        }
    }
}

const emp:Employee[] = [];

emp.push(new Employee('Jonas', 'Jonaitis', 2000));
emp.push(new Employee('Petras', 'Petraitis', 1800));
emp.push(new Employee('Marytė', 'Melnikaitė', 3000));

emp.forEach((e)=> {
        const employee = e.toObject();
        const employeeString = `${employee.name} ${employee.surname}, ${employee.salary.toLocaleString()} (GPM: ${employee.gpm.toLocaleString()}; PSD: ${employee.psd.toLocaleString()}; VSD: ${employee.vsd.toLocaleString()}).`;
        console.log(employeeString);
})
    
const employees:Employee[] = [];

submitBtn.onclick = () => {
    const name = names.value;
    const surname = surnames.value;
    const salary = salaries.valueAsNumber;

    employees.push(new Employee(name, surname, salary));

    employeesList.innerHTML = '';

    employees.forEach((e, i)=> {
        const employee = e.toObject();
        const employeeString = `${employee.name} ${employee.surname}, ${employee.salary.toLocaleString()} (GPM: ${employee.gpm.toLocaleString()}; PSD: ${employee.psd.toLocaleString()}; VSD: ${employee.vsd.toLocaleString()}).`;
        
        const li = document.createElement('li');
        li.innerHTML = employeeString;
        employeesList.appendChild(li);
        
        const btn = document.createElement('button')
        li.appendChild(btn);
        btn.innerHTML = 'Delete';

        btn.onclick = () => {
            li.remove();
            delete employees[i];  
        }
    })
}

