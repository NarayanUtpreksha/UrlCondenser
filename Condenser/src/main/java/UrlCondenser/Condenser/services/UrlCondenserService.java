package UrlCondenser.Condenser.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import UrlCondenser.Condenser.RedisClient;
import UrlCondenser.Condenser.models.ShortenedUrl;
import UrlCondenser.Condenser.models.User;
import UrlCondenser.Condenser.repositories.ShortenedUrlRepository;
import UrlCondenser.Condenser.repositories.UserRepository;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

@Service
public class UrlCondenserService {

    @Value("${app.base-url}")  // Load from application.properties
    private String BASE_URL; // the base url comes from application properties making it dynamic

    private static final String PREDEFINED_STRING = "UrlCondenser";

    private final RedisClient redisClient;  // Inject RedisClient

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShortenedUrlRepository shortenedUrlRepository;

    public UrlCondenserService(RedisClient redisClient) {
        this.redisClient = redisClient;
    }

    public String shortenUrl(String longUrl) {
        int attempt = 0;
        String shortUrl;
        do {
            String input = (attempt == 0) ? longUrl : longUrl + PREDEFINED_STRING + attempt;
            shortUrl = sha1Hash(input).substring(0, 7); // take first 7 characters
            attempt++;
        } while (redisClient.exists(shortUrl)); // check for collision

        redisClient.set(shortUrl, longUrl); // Store in Redis
        return BASE_URL + "/"+ shortUrl;
    }

    private static String sha1Hash(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-1");
            byte[] bytes = md.digest(input.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : bytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-1 Algorithm not found", e);
        }
    }

    public String getLongUrl(String shortId) {
            return redisClient.get(shortId);
    }


    public List<ShortenedUrl> getUrlsByUser(Long userId) {
        return shortenedUrlRepository.findByUserId(userId);
    }
    
    public void saveUrlForUser(String longUrl, String shortUrl, String userEmail) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            ShortenedUrl shortenedUrl = new ShortenedUrl();
            shortenedUrl.setLongUrl(longUrl);
            shortenedUrl.setShortUrl(shortUrl);
            shortenedUrl.setUser(user);
            shortenedUrlRepository.save(shortenedUrl);
        }
    }
}
