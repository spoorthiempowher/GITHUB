package com.example.employee_case_Study.Controller;

import com.example.employee_case_Study.Service.EmployeeService;
import com.example.employee_case_Study.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping(value="/create")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee){
        Employee savedEmployee = employeeService.createEmployee(employee);
        System.out.println(savedEmployee);
       return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    @GetMapping(value="/getByIdOrName")
    public ResponseEntity<Employee> getEmployeeByIdOrName(@RequestParam(required = false) Long id, @RequestParam(required = false) String name){
        Optional<Employee> employee = employeeService.findEmployeeByIdOrName(id, name);
        return employee.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value="/getByDepartmentId")
    public ResponseEntity<List<Employee>> getEmployeeByDepartmentId(@RequestParam Long departmentId){
        List<Employee> employee = employeeService.findEmployeeByDepartmentId(departmentId);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @PutMapping(value="/update/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee){
        Employee updatedEmployee = employeeService.updateEmployee(id, employee);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

    @DeleteMapping(value="/delete/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id){
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping(value="/validate")
    public ResponseEntity<Optional<Employee>> validateEmployee(@RequestParam String email, @RequestParam String password) {
        Optional<Employee> employee = employeeService.findEmployeeByEmail(email);
        if (employee.isPresent()) {
            if (employee.get().getPassword().equals(password)) {
                return new ResponseEntity<>(employee, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(Optional.empty(), HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(Optional.empty(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value="/getAllEmployees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
}

}
