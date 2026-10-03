#!/bin/sh
# Builds the site with drafts and the search index into a folder, and swaps it
# in at the end, so a server that serves that folder never sees it half empty
# (lazy-loaded images would otherwise come back as broken tiles).
#
#   scripts/preview-build.sh [folder] [port]      default: /tmp/site 8088
#
# Then serve it once with
#   python3 -m http.server 8088 --directory /tmp/site
#
# "--environment development" because the legal notice's address
# (data/legal_private.yaml) is not in the repository: a production build would
# stop with an error. Needs Node (npx) for Pagefind.

set -eu
dir=${1:-/tmp/site}
port=${2:-8088}
new="$dir.new"
old="$dir.old"

rm -rf "$new" "$old"
hugo --buildDrafts --environment development --baseURL "http://localhost:$port/" -d "$new"
npx -y pagefind@1.5.2 --site "$new" >/dev/null
[ -d "$dir" ] && mv "$dir" "$old"
mv "$new" "$dir"
rm -rf "$old"
echo "Built into $dir"
