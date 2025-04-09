package UrlCondenser.Condenser.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import UrlCondenser.Condenser.models.ShortenedUrl;
import UrlCondenser.Condenser.models.User;
import UrlCondenser.Condenser.requests.LoginResponse;
import UrlCondenser.Condenser.requests.LoginUserDto;
import UrlCondenser.Condenser.requests.RegisterUserDto;
import UrlCondenser.Condenser.requests.ShortenUrlRequest;
import UrlCondenser.Condenser.services.AuthService;
import UrlCondenser.Condenser.services.JwtService;
import UrlCondenser.Condenser.services.UrlCondenserService;


import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
public class UrlShortenerController {

    @Autowired
    private UrlCondenserService urlShortenerService;

     @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;


    @PostMapping("/api/shorten")
    public ResponseEntity<Map<String, String>> shortenUrl(@RequestBody ShortenUrlRequest shortenUrlRequest) {
        String shortUrl = urlShortenerService.shortenUrl(shortenUrlRequest.longUrl);
        if (shortenUrlRequest.getUserEmail() != null) {
            urlShortenerService.saveUrlForUser(shortenUrlRequest.getLongUrl(), shortUrl, shortenUrlRequest.getUserEmail());
        }
        return ResponseEntity.ok(Map.of("shortUrl", shortUrl));
    }

    @GetMapping("/api/user/urls")
    public ResponseEntity<List<ShortenedUrl>> getUserUrls() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Current user: " + authentication.getName());
        User currentUser = (User) authentication.getPrincipal();

        List<ShortenedUrl> userUrls = urlShortenerService.getUrlsByUser(currentUser.getId());
        return ResponseEntity.ok(userUrls);
    }
    
    @GetMapping("/api/{shortId}")
    public ResponseEntity<Void> redirect(@PathVariable String shortId) {
        String longUrl = urlShortenerService.getLongUrl(shortId);
        return (longUrl != null) ? ResponseEntity.status(302).location(URI.create(longUrl)).build() : ResponseEntity.notFound().build();
    }

    @PostMapping("/api/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/api/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime()).setEmail(authenticatedUser.getEmail()).setFullName(authenticatedUser.getFullName());
        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/api/user-details")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }
}
