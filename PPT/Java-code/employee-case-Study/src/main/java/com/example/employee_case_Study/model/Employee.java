package com.example.employee_case_Study.model;

import jakarta.persistence.Column;
import jakarta.persistence.Id;

import lombok.*;

import jakarta.persistence.Entity;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity

public class Employee {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "designation")
    private String designation;

    @Column(name = "manager")
    private String manager;

    @Column(name = "joining_year")
    private Integer joiningYear;

    @Column(name = "skills")
    private String skills;

    @Column(name = "address")
    private String address;

    @Column(name = "phone_number")
    private Long phoneNumber;

    @Column(name ="status")
    private boolean isActive = true;

    @Column(name = "password")
    private String password;

    @Column(name="role")
    private String role;


}
