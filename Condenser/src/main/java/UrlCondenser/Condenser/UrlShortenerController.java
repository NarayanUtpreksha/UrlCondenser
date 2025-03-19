package UrlCondenser.Condenser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@CrossOrigin(origins = "${app.allowed-origins}")
@RestController
@RequestMapping("/")
public class UrlShortenerController {

    @Autowired
    private UrlCondenserService urlShortenerService;

    @PostMapping("/shorten")
    public ResponseEntity<String> shortenUrl(@RequestBody ShortenUrlRequest shortenUrlRequest) {
        String shortUrl = urlShortenerService.shortenUrl(shortenUrlRequest.longUrl);
        return ResponseEntity.ok(shortUrl);
    }

    @GetMapping("/{shortId}")
    public ResponseEntity<Void> redirect(@PathVariable String shortId) {
        String longUrl = urlShortenerService.getLongUrl(shortId);
        return (longUrl != null) ? ResponseEntity.status(302).location(URI.create(longUrl)).build() : ResponseEntity.notFound().build();
    }
}
