package org.dn.team.basszhattyuk;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "org.dn.team.basszhattyuk")
public class Main {
    public static void main(String[] args) {

        Dotenv dotenv = Dotenv.configure().load();
        System.out.println(dotenv.get("PASS_PICS"));
        System.out.println(dotenv.get("STUD_PICS"));
        System.setProperty("DB_URL", dotenv.get("DB_URL"));
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        System.setProperty("PASS_PICS", dotenv.get("PASS_PICS"));
        System.setProperty("STUD_PICS", dotenv.get("STUD_PICS"));

        SpringApplication.run(Main.class, args);
    }
}
