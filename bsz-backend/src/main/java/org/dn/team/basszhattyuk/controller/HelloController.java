package org.dn.team.basszhattyuk.controller;

import org.springframework.web.bind.annotation.*;


@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }
}