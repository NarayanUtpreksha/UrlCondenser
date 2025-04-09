package UrlCondenser.Condenser.requests;

public class LoginResponse {
    private String token;

    private long expiresIn;

    private String fullName;

    private String email;

    public LoginResponse(){}

    public String getToken() {
        return token;
    }

    public LoginResponse setToken(String token) {
        this.token = token;
        return this;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public LoginResponse setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }
  
    public String getFullName() {
            return fullName;
    }

    public LoginResponse setFullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public LoginResponse setEmail(String email) {
        this.email = email;
        return this;
    }

}
