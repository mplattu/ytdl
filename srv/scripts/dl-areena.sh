#!/bin/bash

URL=${1}
FILE=${2}

if [ -z "$FILE" ]; then
	echo "usage: $0 YLE_Areena_URL output_file_path"
	exit 1
fi

# For debug use following:
# OUTFILE="${FILE}.txt"
OUTFILE="/dev/null"

rm -f "${FILE}"
touch "${FILE}.WAIT"
/usr/local/bin/yle-dl -o "${FILE}" "${URL}" 2>&1 >"${OUTFILE}"
rm -f "${FILE}.WAIT"
