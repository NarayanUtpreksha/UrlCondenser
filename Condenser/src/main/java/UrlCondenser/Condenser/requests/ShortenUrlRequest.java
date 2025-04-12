package UrlCondenser.Condenser.requests;

public class ShortenUrlRequest {
    public String longUrl;
    public String email;

    ShortenUrlRequest() {
    }

    public ShortenUrlRequest(String longUrl, String email) {
        this.longUrl = longUrl;
        this.email = email;
    }

    public String getLongUrl() {
        return longUrl;
    }

    public void setLongUrl(String longUrl) {
        this.longUrl = longUrl;
    }

    public String getUserEmail() {
        return email;
    }

    public void setUserEmail(String email) {
        this.email = email;
    }
}
