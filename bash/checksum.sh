#!/bin/bash

OUTPUT="$(cksum package.json)"
OUTPUT="$OUTPUT $(cksum pkg/api/package.json)"
OUTPUT="$OUTPUT $(cksum pkg/app/package.json)"
echo $OUTPUT
