package com.example.employee_case_Study.Repository;

import com.example.employee_case_Study.model.Employee;
import org.hibernate.annotations.SQLSelect;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findById(Long id);
    Optional<Employee> findByName(String name);

    List<Employee> findByDepartmentId(Long departmentId);
    Optional<Employee> findByEmail(String email);

    List<Employee> findAll();
}
