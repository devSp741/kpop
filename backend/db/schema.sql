-- KPOP Radar MySQL Database Schema
CREATE DATABASE IF NOT EXISTS kpop_radar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE kpop_radar;

-- 1. Artists Table
CREATE TABLE IF NOT EXISTS artists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    type ENUM('GROUP', 'INDIVIDUAL') NOT NULL DEFAULT 'GROUP',
    parent_artist_id INT NULL,
    group_name VARCHAR(100) NULL,
    avatar_url TEXT NULL,
    follower_count VARCHAR(50) DEFAULT '0',
    official_handles JSON NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_artist_id) REFERENCES artists(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_type (type)
) ENGINE=InnoDB;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB;

-- 3. User Follows Table
CREATE TABLE IF NOT EXISTS user_follows (
    user_id INT NOT NULL,
    artist_id INT NOT NULL,
    followed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, artist_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Activity Events Table
CREATE TABLE IF NOT EXISTS activity_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artist_id INT NOT NULL,
    platform ENUM('youtube', 'instagram', 'tiktok', 'spotify', 'weverse', 'twitter', 'facebook') NOT NULL,
    event_type ENUM('MV', 'STORY', 'DANCE_CHALLENGE', 'MUSIC_RELEASE', 'LIVE_STREAM', 'POST') NOT NULL,
    summary_title TEXT NOT NULL,
    thumbnail_url TEXT NULL,
    source_url TEXT NOT NULL,
    published_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE,
    INDEX idx_platform_published (platform, published_at DESC),
    INDEX idx_artist_published (artist_id, published_at DESC)
) ENGINE=InnoDB;

-- 5. User Dismissed Events Table (Persistent Database Swipe-Dismiss Tracking)
CREATE TABLE IF NOT EXISTS user_dismissed_events (
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    dismissed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, event_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES activity_events(id) ON DELETE CASCADE
) ENGINE=InnoDB;
