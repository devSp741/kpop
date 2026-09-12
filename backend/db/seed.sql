-- Top 20 Artists & Activity Events Seed Data for KPOP Radar
USE kpop_radar;

-- Disable FK checks temporarily for bulk insertion
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE activity_events;
TRUNCATE TABLE artists;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Groups (IDs 1 to 10)
INSERT INTO artists (id, slug, name, type, parent_artist_id, group_name, avatar_url, follower_count, official_handles) VALUES
(1, 'bts', 'BTS', 'GROUP', NULL, NULL, 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80', '75.4M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@BTS', 'url', 'https://www.youtube.com/@BTS'),
    'instagram', JSON_OBJECT('handle', '@bts.bighitofficial', 'url', 'https://www.instagram.com/bts.bighitofficial/'),
    'tiktok', JSON_OBJECT('handle', '@bts_official_bighit', 'url', 'https://www.tiktok.com/@bts_official_bighit'),
    'spotify', JSON_OBJECT('handle', 'BTS', 'url', 'https://open.spotify.com/artist/3Nrfpe0tUJi4K4DXYWgMUX'),
    'weverse', JSON_OBJECT('handle', 'BTS Community', 'url', 'https://weverse.io/bts'),
    'twitter', JSON_OBJECT('handle', '@bts_bighit', 'url', 'https://x.com/bts_bighit')
)),
(2, 'blackpink', 'BLACKPINK', 'GROUP', NULL, NULL, 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80', '58.2M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@BLACKPINK', 'url', 'https://www.youtube.com/@BLACKPINK'),
    'instagram', JSON_OBJECT('handle', '@blackpinkofficial', 'url', 'https://www.instagram.com/blackpinkofficial/'),
    'tiktok', JSON_OBJECT('handle', '@bp_tiktok', 'url', 'https://www.tiktok.com/@bp_tiktok'),
    'spotify', JSON_OBJECT('handle', 'BLACKPINK', 'url', 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF'),
    'weverse', JSON_OBJECT('handle', 'BLACKPINK Community', 'url', 'https://weverse.io/blackpink'),
    'twitter', JSON_OBJECT('handle', '@BLACKPINK', 'url', 'https://x.com/BLACKPINK')
)),
(3, 'twice', 'TWICE', 'GROUP', NULL, NULL, 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80', '29.8M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@TWICE', 'url', 'https://www.youtube.com/@TWICE'),
    'instagram', JSON_OBJECT('handle', '@twicetagram', 'url', 'https://www.instagram.com/twicetagram/'),
    'tiktok', JSON_OBJECT('handle', '@twice_tiktok_official', 'url', 'https://www.tiktok.com/@twice_tiktok_official'),
    'spotify', JSON_OBJECT('handle', 'TWICE', 'url', 'https://open.spotify.com/artist/7n2Ycct7Beij7Dj7meI4X0'),
    'twitter', JSON_OBJECT('handle', '@JYPETWICE', 'url', 'https://x.com/JYPETWICE')
)),
(4, 'stray-kids', 'Stray Kids', 'GROUP', NULL, NULL, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&auto=format&fit=crop&q=80', '31.5M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@StrayKids', 'url', 'https://www.youtube.com/@StrayKids'),
    'instagram', JSON_OBJECT('handle', '@realstraykids', 'url', 'https://www.instagram.com/realstraykids/'),
    'tiktok', JSON_OBJECT('handle', '@jypestraykids', 'url', 'https://www.tiktok.com/@jypestraykids'),
    'spotify', JSON_OBJECT('handle', 'Stray Kids', 'url', 'https://open.spotify.com/artist/2dIgFjalVxs4ThymZ67YCE'),
    'twitter', JSON_OBJECT('handle', '@Stray_Kids', 'url', 'https://x.com/Stray_Kids')
)),
(5, 'newjeans', 'NewJeans', 'GROUP', NULL, NULL, 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=80', '14.2M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@NewJeans_official', 'url', 'https://www.youtube.com/@NewJeans_official'),
    'instagram', JSON_OBJECT('handle', '@newjeans_official', 'url', 'https://www.instagram.com/newjeans_official/'),
    'tiktok', JSON_OBJECT('handle', '@newjeans_official', 'url', 'https://www.tiktok.com/@newjeans_official'),
    'spotify', JSON_OBJECT('handle', 'NewJeans', 'url', 'https://open.spotify.com/artist/6HvZYsbFfjnjFrWF950C9d'),
    'weverse', JSON_OBJECT('handle', 'NewJeans Official', 'url', 'https://weverse.io/newjeansofficial'),
    'twitter', JSON_OBJECT('handle', '@NewJeans_ADOR', 'url', 'https://x.com/NewJeans_ADOR')
)),
(6, 'seventeen', 'SEVENTEEN', 'GROUP', NULL, NULL, 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&auto=format&fit=crop&q=80', '16.8M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@pledis17', 'url', 'https://www.youtube.com/@pledis17'),
    'instagram', JSON_OBJECT('handle', '@saythename_17', 'url', 'https://www.instagram.com/saythename_17/'),
    'tiktok', JSON_OBJECT('handle', '@seventeen17_official', 'url', 'https://www.tiktok.com/@seventeen17_official'),
    'spotify', JSON_OBJECT('handle', 'SEVENTEEN', 'url', 'https://open.spotify.com/artist/7nqABJd8QG4YjA4H887a2C'),
    'weverse', JSON_OBJECT('handle', 'SEVENTEEN Community', 'url', 'https://weverse.io/seventeen'),
    'twitter', JSON_OBJECT('handle', '@pledis_17', 'url', 'https://x.com/pledis_17')
)),
(7, 'exo', 'EXO', 'GROUP', NULL, NULL, 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=300&auto=format&fit=crop&q=80', '20.1M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@EXO', 'url', 'https://www.youtube.com/@EXO'),
    'instagram', JSON_OBJECT('handle', '@weareone.exo', 'url', 'https://www.instagram.com/weareone.exo/'),
    'tiktok', JSON_OBJECT('handle', '@weareone.exo_official', 'url', 'https://www.tiktok.com/@weareone.exo_official'),
    'spotify', JSON_OBJECT('handle', 'EXO', 'url', 'https://open.spotify.com/artist/3cjEqqelV9zb4BYE3qDQ4O'),
    'weverse', JSON_OBJECT('handle', 'EXO Community', 'url', 'https://weverse.io/exo'),
    'twitter', JSON_OBJECT('handle', '@weareoneEXO', 'url', 'https://x.com/weareoneEXO')
)),
(8, 'aespa', 'aespa', 'GROUP', NULL, NULL, 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80', '12.9M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@aespa', 'url', 'https://www.youtube.com/@aespa'),
    'instagram', JSON_OBJECT('handle', '@aespa_official', 'url', 'https://www.instagram.com/aespa_official/'),
    'tiktok', JSON_OBJECT('handle', '@aespa_official', 'url', 'https://www.tiktok.com/@aespa_official'),
    'spotify', JSON_OBJECT('handle', 'aespa', 'url', 'https://open.spotify.com/artist/0X223JKK0JtH4F3bLpWJtU'),
    'weverse', JSON_OBJECT('handle', 'aespa Community', 'url', 'https://weverse.io/aespa'),
    'twitter', JSON_OBJECT('handle', '@aespa_official', 'url', 'https://x.com/aespa_official')
)),
(9, 'enhypen', 'ENHYPEN', 'GROUP', NULL, NULL, 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=300&auto=format&fit=crop&q=80', '15.7M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@ENHYPENOFFICIAL', 'url', 'https://www.youtube.com/@ENHYPENOFFICIAL'),
    'instagram', JSON_OBJECT('handle', '@enhypen', 'url', 'https://www.instagram.com/enhypen/'),
    'tiktok', JSON_OBJECT('handle', '@enhypen', 'url', 'https://www.tiktok.com/@enhypen'),
    'spotify', JSON_OBJECT('handle', 'ENHYPEN', 'url', 'https://open.spotify.com/artist/5t5FqBwTcgKTaWmfEbwQY9'),
    'weverse', JSON_OBJECT('handle', 'ENHYPEN Community', 'url', 'https://weverse.io/enhypen'),
    'twitter', JSON_OBJECT('handle', '@ENHYPEN', 'url', 'https://x.com/ENHYPEN')
)),
(10, 'le-sserafim', 'LE SSERAFIM', 'GROUP', NULL, NULL, 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?w=300&auto=format&fit=crop&q=80', '10.4M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@LESSERAFIM_official', 'url', 'https://www.youtube.com/@LESSERAFIM_official'),
    'instagram', JSON_OBJECT('handle', '@le_sserafim', 'url', 'https://www.instagram.com/le_sserafim/'),
    'tiktok', JSON_OBJECT('handle', '@le_sserafim', 'url', 'https://www.tiktok.com/@le_sserafim'),
    'spotify', JSON_OBJECT('handle', 'LE SSERAFIM', 'url', 'https://open.spotify.com/artist/4SpNCjQyZ3Lg6H6066r0p1'),
    'weverse', JSON_OBJECT('handle', 'LE SSERAFIM Community', 'url', 'https://weverse.io/lesserafim'),
    'twitter', JSON_OBJECT('handle', '@LE_SSERAFIM', 'url', 'https://x.com/LE_SSERAFIM')
));

-- 2. Insert Individual Idols / Members (IDs 11 to 20)
INSERT INTO artists (id, slug, name, type, parent_artist_id, group_name, avatar_url, follower_count, official_handles) VALUES
(11, 'jimin', 'Jimin', 'INDIVIDUAL', 1, 'BTS', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80', '54.1M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@BTS', 'url', 'https://www.youtube.com/@BTS'),
    'instagram', JSON_OBJECT('handle', '@j.m', 'url', 'https://www.instagram.com/j.m/'),
    'tiktok', JSON_OBJECT('handle', '@bts_official_bighit', 'url', 'https://www.tiktok.com/@bts_official_bighit'),
    'spotify', JSON_OBJECT('handle', 'Jimin', 'url', 'https://open.spotify.com/artist/1oSPZhR1FRjE24YVfSjN6Q'),
    'weverse', JSON_OBJECT('handle', 'BTS Community (Jimin)', 'url', 'https://weverse.io/bts'),
    'twitter', JSON_OBJECT('handle', '@bts_bighit', 'url', 'https://x.com/bts_bighit')
)),
(12, 'v', 'V (Kim Taehyung)', 'INDIVIDUAL', 1, 'BTS', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80', '65.8M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@BTS', 'url', 'https://www.youtube.com/@BTS'),
    'instagram', JSON_OBJECT('handle', '@thv', 'url', 'https://www.instagram.com/thv/'),
    'tiktok', JSON_OBJECT('handle', '@bts_official_bighit', 'url', 'https://www.tiktok.com/@bts_official_bighit'),
    'spotify', JSON_OBJECT('handle', 'V', 'url', 'https://open.spotify.com/artist/3JsHnELd2Jj83l17X11V8Y'),
    'weverse', JSON_OBJECT('handle', 'BTS Community (V)', 'url', 'https://weverse.io/bts'),
    'twitter', JSON_OBJECT('handle', '@bts_bighit', 'url', 'https://x.com/bts_bighit')
)),
(13, 'jungkook', 'Jungkook', 'INDIVIDUAL', 1, 'BTS', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80', '41.2M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@BTS', 'url', 'https://www.youtube.com/@BTS'),
    'instagram', JSON_OBJECT('handle', '@bts.bighitofficial', 'url', 'https://www.instagram.com/bts.bighitofficial/'),
    'tiktok', JSON_OBJECT('handle', '@jungkook', 'url', 'https://www.tiktok.com/@jungkook'),
    'spotify', JSON_OBJECT('handle', 'Jung Kook', 'url', 'https://open.spotify.com/artist/66CXWjxzNUsgR8y42wG2iV'),
    'weverse', JSON_OBJECT('handle', 'BTS Community (Jungkook)', 'url', 'https://weverse.io/bts'),
    'twitter', JSON_OBJECT('handle', '@bts_bighit', 'url', 'https://x.com/bts_bighit')
)),
(14, 'lisa', 'Lisa', 'INDIVIDUAL', 2, 'BLACKPINK', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80', '104.2M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@LilifilmOfficial', 'url', 'https://www.youtube.com/@LilifilmOfficial'),
    'instagram', JSON_OBJECT('handle', '@lalalalisa_m', 'url', 'https://www.instagram.com/lalalalisa_m/'),
    'tiktok', JSON_OBJECT('handle', '@wearelloud', 'url', 'https://www.tiktok.com/@wearelloud'),
    'spotify', JSON_OBJECT('handle', 'LISA', 'url', 'https://open.spotify.com/artist/5L1lO4eRHmJ7a0Q6csE5cT'),
    'weverse', JSON_OBJECT('handle', 'BLACKPINK Community (Lisa)', 'url', 'https://weverse.io/blackpink'),
    'twitter', JSON_OBJECT('handle', '@wearelloud', 'url', 'https://x.com/wearelloud')
)),
(15, 'jennie', 'Jennie', 'INDIVIDUAL', 2, 'BLACKPINK', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80', '85.6M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@Jennierubyjane', 'url', 'https://www.youtube.com/@Jennierubyjane'),
    'instagram', JSON_OBJECT('handle', '@jennierubyjane', 'url', 'https://www.instagram.com/jennierubyjane/'),
    'tiktok', JSON_OBJECT('handle', '@jennierubyjane', 'url', 'https://www.tiktok.com/@jennierubyjane'),
    'spotify', JSON_OBJECT('handle', 'JENNIE', 'url', 'https://open.spotify.com/artist/25uiPmpxbS3h12dY30h37A'),
    'weverse', JSON_OBJECT('handle', 'BLACKPINK Community (Jennie)', 'url', 'https://weverse.io/blackpink'),
    'twitter', JSON_OBJECT('handle', '@oddatelier', 'url', 'https://x.com/oddatelier')
)),
(16, 'rose', 'Rosé', 'INDIVIDUAL', 2, 'BLACKPINK', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80', '79.1M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@ROSEofficial', 'url', 'https://www.youtube.com/@ROSEofficial'),
    'instagram', JSON_OBJECT('handle', '@roses_are_rosie', 'url', 'https://www.instagram.com/roses_are_rosie/'),
    'tiktok', JSON_OBJECT('handle', '@roses_are_rosie', 'url', 'https://www.tiktok.com/@roses_are_rosie'),
    'spotify', JSON_OBJECT('handle', 'ROSÉ', 'url', 'https://open.spotify.com/artist/3eVa5w3URK5duf6eyVDbu9'),
    'weverse', JSON_OBJECT('handle', 'BLACKPINK Community (Rosé)', 'url', 'https://weverse.io/blackpink'),
    'twitter', JSON_OBJECT('handle', '@numberoneHQ', 'url', 'https://x.com/numberoneHQ')
)),
(17, 'nayeon', 'Nayeon', 'INDIVIDUAL', 3, 'TWICE', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&auto=format&fit=crop&q=80', '12.4M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@TWICE', 'url', 'https://www.youtube.com/@TWICE'),
    'instagram', JSON_OBJECT('handle', '@nayeonyny', 'url', 'https://www.instagram.com/nayeonyny/'),
    'tiktok', JSON_OBJECT('handle', '@twice_tiktok_official', 'url', 'https://www.tiktok.com/@twice_tiktok_official'),
    'spotify', JSON_OBJECT('handle', 'NAYEON', 'url', 'https://open.spotify.com/artist/1VwDG9aBflQupaFNjUru9A'),
    'twitter', JSON_OBJECT('handle', '@JYPETWICE', 'url', 'https://x.com/JYPETWICE')
)),
(18, 'iu', 'IU (Lee Ji-eun)', 'INDIVIDUAL', NULL, 'Soloist', 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&auto=format&fit=crop&q=80', '32.8M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@dlwlrma', 'url', 'https://www.youtube.com/@dlwlrma'),
    'instagram', JSON_OBJECT('handle', '@dlwlrma', 'url', 'https://www.instagram.com/dlwlrma/'),
    'tiktok', JSON_OBJECT('handle', '@iu_official', 'url', 'https://www.tiktok.com/@iu_official'),
    'spotify', JSON_OBJECT('handle', 'IU', 'url', 'https://open.spotify.com/artist/3H1Qn1t2kQkQCjWlC5fQy8'),
    'twitter', JSON_OBJECT('handle', '@_iuofficial', 'url', 'https://x.com/_iuofficial')
)),
(19, 'taeyang', 'Taeyang', 'INDIVIDUAL', NULL, 'BIGBANG / Soloist', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80', '14.5M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@TAEYANG_Official', 'url', 'https://www.youtube.com/@TAEYANG_Official'),
    'instagram', JSON_OBJECT('handle', '@__youngbae__', 'url', 'https://www.instagram.com/__youngbae__/'),
    'tiktok', JSON_OBJECT('handle', '@taeyang_theblacklabel', 'url', 'https://www.tiktok.com/@taeyang_theblacklabel'),
    'spotify', JSON_OBJECT('handle', 'TAEYANG', 'url', 'https://open.spotify.com/artist/0hTypEc13q76R0d95N3p6P'),
    'twitter', JSON_OBJECT('handle', '@Realtaeyang', 'url', 'https://x.com/Realtaeyang')
)),
(20, 'baekhyun', 'Baekhyun', 'INDIVIDUAL', 7, 'EXO', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80', '21.9M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@baekhyun', 'url', 'https://www.youtube.com/@baekhyun'),
    'instagram', JSON_OBJECT('handle', '@baekhyunee_exo', 'url', 'https://www.instagram.com/baekhyunee_exo/'),
    'tiktok', JSON_OBJECT('handle', '@baekhyun_inb100', 'url', 'https://www.tiktok.com/@baekhyun_inb100'),
    'spotify', JSON_OBJECT('handle', 'BAEKHYUN', 'url', 'https://open.spotify.com/artist/4ufh0WuMZh6y4Dmdnklvdl'),
    'twitter', JSON_OBJECT('handle', '@B_hundred_Hyun', 'url', 'https://x.com/B_hundred_Hyun')
)),
(21, 'satyam', 'Satyam', 'INDIVIDUAL', NULL, 'Creator / Soloist', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80', '1.2M', JSON_OBJECT(
    'youtube', JSON_OBJECT('handle', '@developerBaba75', 'url', 'https://www.youtube.com/@developerBaba75'),
    'instagram', JSON_OBJECT('handle', '@devel_operbaba', 'url', 'https://www.instagram.com/devel_operbaba/'),
    'spotify', JSON_OBJECT('handle', 'Satyam', 'url', 'https://open.spotify.com/'),
    'weverse', JSON_OBJECT('handle', 'Satyam Community', 'url', 'https://weverse.io/'),
    'twitter', JSON_OBJECT('handle', '@developersp741', 'url', 'https://x.com/developersp741')
));

-- 3. Insert Activity Events
INSERT INTO activity_events (id, artist_id, platform, event_type, summary_title, thumbnail_url, source_url, published_at) VALUES
(1, 11, 'spotify', 'MUSIC_RELEASE', 'Released new solo track ''Who'' (MUSE Album)', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80', 'https://open.spotify.com/artist/1oSPZhR1FRjE24YVfSjN6Q', '2026-09-10 09:15:00'),
(2, 1, 'youtube', 'MV', 'Official Music Video Premiere: ''Take Two'' Special Performance', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80', 'https://www.youtube.com/@BTS', '2026-09-10 08:30:00'),
(3, 14, 'tiktok', 'DANCE_CHALLENGE', 'New TikTok Dance Challenge for ''Rockstar'' with LLOUD crew', 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=80', 'https://www.tiktok.com/@wearelloud', '2026-09-10 07:45:00'),
(4, 2, 'instagram', 'POST', 'BORN PINK World Tour Encore Memories Photo Dump', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80', 'https://www.instagram.com/blackpinkofficial/', '2026-09-10 06:20:00'),
(5, 12, 'weverse', 'LIVE_STREAM', 'Started a surprise Weverse Live: ''Late Night Music & Chat''', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=80', 'https://weverse.io/bts', '2026-09-10 05:00:00'),
(6, 5, 'twitter', 'POST', 'Official Announcement: Tokyo Dome Fan Meeting Special Merch Teaser', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop&q=80', 'https://x.com/NewJeans_ADOR', '2026-09-10 03:30:00'),
(7, 13, 'spotify', 'MUSIC_RELEASE', 'Surpassed 2 Billion streams on ''Seven (feat. Latto)'' on Spotify', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80', 'https://open.spotify.com/artist/66CXWjxzNUsgR8y42wG2iV', '2026-09-09 22:10:00'),
(8, 3, 'youtube', 'MV', 'New MV Drop: ''Strategy (feat. Megan Thee Stallion)''', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80', 'https://www.youtube.com/@TWICE', '2026-09-09 18:00:00'),
(9, 15, 'instagram', 'STORY', 'Posted Behind-The-Scenes Story from Chanel Fashion Week Paris', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80', 'https://www.instagram.com/jennierubyjane/', '2026-09-09 15:40:00'),
(10, 4, 'youtube', 'MV', 'SKZ-CODE Ep.58 Teaser Video Released on Official Channel', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=80', 'https://www.youtube.com/@StrayKids', '2026-09-09 12:00:00'),
(11, 8, 'tiktok', 'DANCE_CHALLENGE', '''Whiplash'' Dance Challenge Clip with Karina & Winter', 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=80', 'https://www.tiktok.com/@aespa_official', '2026-09-09 10:15:00'),
(12, 18, 'youtube', 'POST', 'IU Palette Ep.26 Guest Announcement: Special Concert Highlights', 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&auto=format&fit=crop&q=80', 'https://www.youtube.com/@dlwlrma', '2026-09-08 19:00:00');
