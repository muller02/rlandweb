package kr.co.rland.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecuriryConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf->csrf.disable())
            .authorizeHttpRequests((requests) -> requests
                .requestMatchers("/member/**").hasAnyRole("MEMBER", "ADMIN")
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().permitAll()
            )
            .formLogin((form) -> form
                .loginPage("/user/signin")
                .permitAll()
            )
            .logout((logout) -> logout
                .logoutUrl("/user/signout")
                .logoutSuccessUrl("/index")
                .permitAll());

        return http.build();
    }


    @Bean
    public UserDetailsService userDetailsService() {
      UserDetails user1 =
                        User.builder()
                            .username("cho")
                            .password("{noop}cho")
                            .roles("MEMBER")
                            .build();
      UserDetails user2 =
                        User.builder()
                            .username("newlec")
                            .password("{noop}111")
                            .roles("MEMBER", "ADMIN")
                            .build();

      return new InMemoryUserDetailsManager(user1, user2);
   }
    
}
