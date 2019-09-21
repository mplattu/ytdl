<?php
    $DOWNLOADERS = Array(
        Array('legend' => 'Youtube', 'regexp' => '/\.youtube\..+v\=([a-zA-Z0-9\-_]+)/i', 'url' => 'https://www.youtube.com/watch?v=#', 'script' => '/usr/local/canister/groups/www/doc/ytdl/dl-youtube.sh', 'filename' => 'get_filename_youtube', 'ext' => '.mp4'),
        Array('legend' => 'YLE Areena', 'regexp' => '/areena\.yle\.fi\/([\d-]+)/i', 'url' => 'http://areena.yle.fi/#', 'script' => '/usr/local/canister/groups/www/doc/ytdl/dl-areena.sh', 'filename' => 'get_filename_areena', 'ext' => '.mp4'),
        Array('legend' => 'YLE Areena TV', 'regexp' => '/\.yle\.fi\/tv\/([0-9]+)/i', 'url' => 'http://areena.yle.fi/tv/#', 'script' => '/usr/local/canister/groups/www/doc/ytdl/dl-areena.sh', 'filename' => 'get_filename_areena', 'ext' => '.flv'),
        Array('legend' => 'YLE Areena radio', 'regexp' => '/\.yle\.fi\/radio\/([0-9]+)/i', 'url' => 'http://areena.yle.fi/radio/#', 'script' => '/usr/local/canister/groups/www/doc/ytdl/dl-areena.sh', 'filename' => 'get_filename_areena', 'ext' => '.flv'),
    );

    $JOBS = Array(
        Array('name' => 'mp3', 'legend' => 'MP3', 'script' => '/usr/local/canister/groups/www/doc/ytdl/enc-mp3.sh', 'ext' => '.mp3', 'default' => TRUE),
        Array('name' => 'm4v_nokia500', 'legend' => 'MP4-video (Nokia 500, pienennetty kuvakoko)', 'ext' => '.m4v', 'script' => '/usr/local/canister/groups/www/doc/ytdl/enc-m4v-nokia500.sh'),
        Array('name' => 'm4v_original', 'legend' => 'MP4-video (alkuperäiskoko)', 'ext' => '.m4v', 'script' => '/usr/local/canister/groups/www/doc/ytdl/enc-m4v-original.sh'),
    );

    $PATH_DOWNLOAD = dirname($_SERVER['SCRIPT_FILENAME']).'/download';
    $PATH_FINAL = dirname($_SERVER['SCRIPT_FILENAME']).'/final';

    $URL_FINAL = 'final/';

    $ICONS = Array(
		'/\.mp3$/' => 'audio',
		'/\.m4v$|\.mp4$|\.flv$/' => 'video',
    );
?>
