package com.employees.services;

import com.employees.model.Employee;
import com.employees.repository.EmployeeRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee create(Employee employee) {
       return employeeRepository.save(employee);
    }

    @Override
    public Employee get(int id) {
        return employeeRepository.findOne(id);
    }

    @Override
    public Employee update(Employee employee) {
        Employee employeeToUpdate = get(employee.getId());
        if(employeeToUpdate != null){
            employeeToUpdate.setName(employee.getName());
            employeeToUpdate.setSalary(employee.getSalary());
             return employeeRepository.save(employee);
        }
       return null;
    }

    @Override
    public Employee delete(int id) {
        Employee employeeToDelete = get(id);
        if(employeeToDelete != null){
          employeeRepository.delete(id);
          return employeeToDelete;
        }
        return null;
    }

    @Override
    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }
}
