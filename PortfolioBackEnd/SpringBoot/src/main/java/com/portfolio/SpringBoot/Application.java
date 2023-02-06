package com.portfolio.SpringBoot;

import java.util.Date;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
                System.out.println("###### Application.java class ######");
                Date date = new Date();
                System.out.println(date);
		SpringApplication.run(Application.class, args);
	}

}
// ###########################  ATENCION  ##############################
// VER SI TRAS COMPILAR ARROJA ERROR "no main manifest attribute in [nombre_archivo].jar
//
// https://parzibyte.me/blog/2022/03/23/compilar-proyecto-java-netbeans-maven-crear-jar/

// PRACTICAS PREVIAS, CURSOS, BLOGS, ETC. MATERIAL DE ESTUDIO
//
// Coursera - coursera.org/learn/algorithmic-thinking-1
// Hackerrank - hackerrank.com/
// Codility - app.codility.com/demo/take-sample-test/
// Khan Acadamy - khanacademy.org/computing/computer-science/algorithms
// Data structures and algorithms - leetcode.com
// System Design - github.com/donnemartin/system-design-primer
// OOP & Design Patterns - youtube.com/playlist?list=PLF206E906175C7E07
// Git - git-scm.com/book/en/v2