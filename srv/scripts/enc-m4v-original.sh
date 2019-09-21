#!/bin/bash

FILE_IN=${1}
FILE_OUT=${2}
FILE_WAIT="${FILE_OUT}.WAIT"
EXT_IN=.mp4

rm -f "${FILE_OUT}"
touch "${FILE_WAIT}"

SUBTITLES_PATH=`dirname "${FILE_IN}"`
SUBTITLES_BASE=`basename "${FILE_IN}" ${EXT_IN}`
SUBTITLES="${SUBTITLES_PATH}/${SUBTITLES_BASE}.fin.srt"

if [ -f "${SUBTITLES}" ]; then
    # There is a subtitles file
    echo "Subtitles file exists: ${SUBTITLES}" >>${FILE_WAIT}
    /usr/bin/mencoder -o "${FILE_OUT}" "${FILE_IN}" -oac mp3lame -ovc x264 -x264encopts subq=4:bframes=2:b_pyramid=normal:weight_b -sub "${SUBTITLES}" -subcp utf8 >>${FILE_WAIT}
else
    # There are no subtitles file
    echo "Subtitles file not found: ${SUBTITLES}" >>${FILE_WAIT}
    /usr/bin/mencoder -o "${FILE_OUT}" "${FILE_IN}" -oac mp3lame -ovc x264 -x264encopts subq=4:bframes=2:b_pyramid=normal:weight_b >>${FILE_WAIT}
fi

rm -f "${FILE_IN}"

# Delete subtitles
FILE_IN_BASE=`basename "${FILE_IN}" ${EXT_IN}`
FILE_IN_PATH=`dirname "${FILE_IN}"`
echo "Deleting ${FILE_IN_PATH}/${FILE_IN_BASE}.*.srt"
rm -f ${FILE_IN_PATH}/${FILE_IN_BASE}.*.srt

rm -f "${FILE_WAIT}"
