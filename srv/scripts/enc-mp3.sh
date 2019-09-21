#!/bin/bash

FILE_IN=${1}
FILE_OUT=${2}

if [ -z "$FILE_OUT" ]; then
	echo "usage: $0 file_in file_out"
	exit 1
fi

rm -f "${FILE_OUT}"
touch "${FILE_OUT}.WAIT"
/usr/bin/ffmpeg -i "${FILE_IN}" -ar 44100 -ab 160 -ac 2 "${FILE_OUT}"
rm -f "${FILE_IN}"

# Delete subtitles
FILE_IN_BASE=`basename "${FILE_IN}" .mp4`
FILE_IN_PATH=`dirname "${FILE_IN}"`
rm -f "${FILE_IN_PATH}/${FILE_IN_BASE}.*.srt"

rm -f "${FILE_OUT}.WAIT"
