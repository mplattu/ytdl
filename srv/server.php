<?php
	include_once("settings.php");

	function log_message ($message) {
		error_log("[YTDL server] ".$message, 4);
	}

	// At this point we're just printing the POST variables and exiting
	$post_data = json_decode(file_get_contents('php://input'), true);
	log_message(print_r($post_data, true));

	$function = @$post_data['function'];
	if (!is_null($function)) {
		$function = strtolower($function);
	}

	log_message("Started");

  $result = Array();

  if ($function == 'submit') {
		// "submit" is currently the only function

		$url = @$post_data['url'];

		if ($url != '') {
			// We have the URL, process it

			// Find the downloader based on the given URL
			$downloader = NULL;

			foreach ($DOWNLOADERS as $this_downloader) {
				if (preg_match($this_downloader['regexp'], $url, $matches)) {
					$downloader = $this_downloader;
					$downloader['url'] = preg_replace('/#/', $matches[1], $downloader['url']);
				}
			}

			// Find the conversion job based on the given 'target' value
			$job = NULL;

			foreach ($JOBS as $this_job) {
				if (@$post_data['target'] == $this_job['name']) {
					$job = $this_job;
				}
			}

			log_message("Downloader: ".$downloader['legend']." Job: ".$job['legend']." URL: ".$downloader['url']);

			if (is_null($downloader)) {
				$result['message'] = "Virhe: URL on tuntematon";
			}
			elseif (is_null($job)) {
				$result['message'] = "Virhe: Tulostyyppi on tuntematon";
			}
			else {
				$filename = 'foo_bar_'.getmypid();

				if (is_callable($downloader['filename'])) {
					// Generate filename from the URL
					log_message("Getting filename...");
					$filename = $downloader['filename']($downloader['url']);
					log_message("Got filename: ".$filename);
				}

				$file_download = $PATH_DOWNLOAD.'/'.$filename.$downloader['ext'];
				$file_final = $PATH_FINAL.'/'.$filename.$job['ext'];

				$cmdline = 'echo "'.$downloader['script'].' \''.$downloader['url'].'\' \''.$file_download.'\' && '.$job['script'].' \''.$file_download.'\' \''.$file_final.'\'" | /usr/bin/at NOW 2>&1';
				log_message("Download command: ".$cmdline);
				$result['cmdline'] = $cmdline;
				$result['exec'] = shell_exec($cmdline);
				$result['message'] = "Työ on otettu vastaan";
			}
		}
	}
	elseif ($function == "files") {
		$type = strtolower(@$post_data['type']);

		// Fallback default
		$files_path = $PATH_DOWNLOAD;
		if ($type == 'inprogress') {
			$files_path = $PATH_DOWNLOAD;
		}
		elseif ($type == 'download') {
			$files_path = $PATH_FINAL;
		}

		// Store file details to this hash
		$files = Array();

		$dh = opendir($files_path);
		if ($dh) {
			while (false !== ($entry = readdir($dh))) {
				if (file_skip($entry)) {
					continue;
				}

				$file_data = Array();

				$file_data['name'] = $entry;
				$file_data['url'] = $URL_FINAL.$entry;
				$file_data['size'] = filesize($files_path.'/'.$entry);
				$file_data['wait'] = file_has_wait($files_path.'/'.$entry);
				if ($file_data['wait']) {
					$file_data['icon'] = "clock";
				}
				else {
					$file_data['icon'] = get_icon($entry);
				}

				$files[$entry] = $file_data;
			}
			sort($files, SORT_STRING | SORT_FLAG_CASE);
			$result['files'] = $files;
			closedir($dh);
			$result['message'] = "Tiedostolistan lataus onnistui";
		}
		else {
			$result['message'] = "En voi ladata tiedostoja";
		}
	}
	elseif ($function == "url") {
		$filename = @$post_data['filename'];
		$result['url'] = $URL_FINAL.$filename;
		}
	else {
		$result['message'] = "Virhe: Tuntematon toiminto";
	}

	log_message("Normal termination: ".$result['message']);

	echo(json_encode($result));

    // Normal termination
    exit(0);


    function get_icon ($filename) {
		global $ICONS;

		foreach ($ICONS as $this_icon_key => $this_icon_value) {
			if (preg_match($this_icon_key, $filename)) {
				return $this_icon_value;
			}
		}
	}

	function file_skip ($entry) {
		$skip = false;

		if ($entry == ".") $skip = true;
		if ($entry == "..") $skip = true;
		if (preg_match('/\.WAIT$/', $entry)) $skip = true;
		if (preg_match('/\.srt$/', $entry)) $skip = true;

		return $skip;
	}

	function file_has_wait ($filename) {
		if (file_exists($filename.".WAIT")) {
			return true;
		}

		return false;
	}

	function get_filename_youtube ($url) {
		log_message("get_filename_youtube: ".$url);

    	$video_id = NULL;
    	if (preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $url, $match)) {
			$video_id = $match[1];
		}

    	$video_title = "Random Youtube Video ".rand();

		if (! is_null($video_id)) {
			$video_data = get_youtube_video($video_id);
			if (! is_null($video_data)) {
				$video_title = $video_data['title'];
			}
		}

		log_message("get_filename_youtube: ".$video_title);

		$filename = preg_replace('/ /', '_', $video_title);
		$filename = preg_replace('/[^a-zA-Z0-9_]/', '', $filename);

		return $filename;
	}

    function get_youtube_video($video_id) {
    	$ch = curl_init();
    	curl_setopt($ch, CURLOPT_URL, "http://youtube.com/get_video_info?video_id=".$video_id);
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    	$response = curl_exec($ch);
    	curl_close($ch);

    	parse_str($content, $ytarr);

    	log_message(print_r($ytarr, true));

    	return Array('title' => "Testi-".rand());
	}


    function get_filename_areena ($url) {
        $page = file_get_contents($url);

        if (preg_match('/<title>(.+?)<\/title>/i', $page, $matches)) {
            $filename = $matches[1];
            $filename = preg_replace('/ /', '_', $filename);
            $filename = preg_replace('/\./', '-', $filename);
            $filename = preg_replace('/[^a-zA-Z0-9_\-]/', '', $filename);

            $filename = preg_replace('/_+/', '_', $filename);
            $filename = preg_replace('/_TV_Areena_yle-fi/', '', $filename);

            return $filename;
			}

        return NULL;
		}
?>
