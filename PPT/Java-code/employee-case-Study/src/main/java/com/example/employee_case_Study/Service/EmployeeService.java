package com.example.employee_case_Study.Service;

import com.example.employee_case_Study.Repository.EmployeeRepository;
import com.example.employee_case_Study.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee createEmployee(Employee employee){
        Employee employee1 = new Employee();
        employee1.setId(employee.getId());
        employee1.setName(employee.getName());
        employee1.setEmail(employee.getEmail());
        employee1.setAddress(employee.getAddress());
        employee1.setDesignation(employee.getDesignation());
        employee1.setManager(employee.getManager());
        employee1.setSkills(employee.getSkills());
        employee1.setDepartmentId(employee.getDepartmentId());
        employee1.setJoiningYear(employee.getJoiningYear());
        employee1.setPhoneNumber(employee.getPhoneNumber());
        employee1.setPassword(employee.getPassword());
        employee1.setRole(employee.getRole());
        return employeeRepository.save(employee1);
    }

    public Optional<Employee> findEmployeeByIdOrName(Long id, String name){
        if(id != null){
            return employeeRepository.findById(id);
        }else if(name!=null){
            return employeeRepository.findByName(name);
        }
        return Optional.empty();
    }

    public List<Employee> findEmployeeByDepartmentId(Long departmentId){
        return employeeRepository.findByDepartmentId(departmentId);
    }

    public Employee updateEmployee(Long id, Employee employee){
        Employee employee1 = employeeRepository.findById(id).orElseThrow(() -> new ResourceAccessException("Employee not found for the id :: "+id));
        employee1.setId(employee.getId());
        employee1.setName(employee.getName());
        employee1.setAddress(employee.getAddress());
        employee1.setDesignation(employee.getDesignation());
        employee1.setManager(employee.getManager());
        employee1.setSkills(employee.getSkills());
        employee1.setDepartmentId(employee.getDepartmentId());
        employee1.setJoiningYear(employee.getJoiningYear());
        employee1.setPhoneNumber(employee.getPhoneNumber());
        employee1.setRole(employee.getRole());
        employee1.setActive(employee.isActive());
        return employeeRepository.save(employee1);
    }

    public void deleteEmployee(Long id){
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceAccessException("Employee not found for the id :: "+id));
        employee.setActive(false);
        employeeRepository.save(employee);
    }

    public Optional<Employee> findEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
}
