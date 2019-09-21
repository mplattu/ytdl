.PHONY: start test-files-final test-files-download

test-files-final:
	if [ -d dist/final/ ]; then rm -fR dist/final/; fi
	mkdir -p dist/final/
	touch dist/final/video_processing.m4v
	touch dist/final/video_processing.m4v.WAIT
	touch dist/final/video_processed.m4v
	touch dist/final/audio_processecd.mp3

test-files-download:
	if [ -d dist/download/ ]; then rm -fR dist/download/; fi
	mkdir -p dist/download/
	touch dist/download/video_downloading.flv
	touch dist/download/video_downloading.flv.srt
	touch dist/download/video_downloading.flv.WAIT
	touch dist/download/video_downloaded.mp4
	touch dist/download/video_downloaded.mp4.srt

test-files: test-files-download test-files-final

dist/index.html: static/index.html
	cp static/index.html dist/index.html

dist: package.json src/* static/* srv/* srv/scripts/*
	npx webpack --config webpack.config.js
	cp -r srv/scripts/ dist/
	cp srv/*.php dist/
	cp static/* dist/

start: dist
	php -S 0.0.0.0:8080 -t dist/
