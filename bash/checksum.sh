#!/bin/bash

OUTPUT="$(cksum package.json)"
OUTPUT="$OUTPUT $(cksum pkg/api/package.json)"
OUTPUT="$OUTPUT $(cksum pkg/native/package.json)"
echo $OUTPUT
