/*
 * Para que se integre/comunique nuestra app frontend
 * Habilitacion del Cors
 */
package com.portfolio.SpringBoot;

import java.util.Date;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
* Clase que habilita CORS
* @author YO Walter Romero
*/
@EnableWebMvc
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
//            .allowedOrigins("*")
//            .allowedHeaders("*");

        System.out.println("###### WebConfig class ######");
        Date date = new Date();
        System.out.println(date);
    }
    
}
