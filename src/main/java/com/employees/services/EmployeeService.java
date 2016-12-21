package com.employees.services;

import com.employees.model.Employee;

import java.util.List;

public interface EmployeeService {

    public Employee create(Employee employee);

    public Employee get(int id);

    public Employee update(Employee employee);

    public Employee delete(int id);

    public List<Employee> getAll();

}
