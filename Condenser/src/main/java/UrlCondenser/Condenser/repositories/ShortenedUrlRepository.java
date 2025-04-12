package UrlCondenser.Condenser.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import UrlCondenser.Condenser.models.ShortenedUrl;

@Repository
public interface ShortenedUrlRepository extends JpaRepository<ShortenedUrl, Long> {
    List<ShortenedUrl> findByUserId(Long userId);
}