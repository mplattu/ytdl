#!/bin/bash

URL=${1}
FILE=${2}
let RETRYMAX=10

if [ -z "$FILE" ]; then
	echo "usage: $0 Youtube_URL output_file_path"
	exit 1
fi

WAITFILE="${FILE}.WAIT"

rm -f "${FILE}"

let RETRYCOUNT=0
let RETRY=1
while (( RETRY > 0 ))
do
	{ /usr/local/bin/youtube-dl --no-playlist --no-progress -o "${FILE}" "${URL}"; } >"${WAITFILE}" 2>&1
	if [ "`grep -P 'Segmentation fault' ${WAITFILE}`" != "" ]; then
		echo "Segfault detected"
		let RETRYCOUNT++
	else
		echo "Downloaded without segfault"
		RETRY=0
	fi
	
	if (( RETRYCOUNT > RETRYMAX)); then
		RETRY=0
		rm -f "${OUTFILE}.part"
	fi
	
	echo ${RETRYCOUNT}
done

rm -f "${WAITFILE}"
