package UrlCondenser.Condenser.services;

import UrlCondenser.Condenser.models.User;
import UrlCondenser.Condenser.repositories.UserRepository;
import UrlCondenser.Condenser.requests.LoginUserDto;
import UrlCondenser.Condenser.requests.RegisterUserDto;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Key;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired 
    private AuthenticationManager authenticationManager;

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Secret key for signing JWT

    public User signup(RegisterUserDto input) {
        if (userRepository.findByEmail(input.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already registered.");
        }
        User user = new User()
                .setFullName(input.getFullName())
                .setEmail(input.getEmail())
                .setPassword(passwordEncoder.encode(input.getPassword()));


        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        
        System.out.println("User authenticated: " + input.getEmail());
        User user = userRepository.findByEmail(input.getEmail())
                .orElseThrow();

        if (!passwordEncoder.matches(input.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid password.");
        }

        return user;
    }

    
}