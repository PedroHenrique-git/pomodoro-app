#!/bin/bash
echo "commit message: "
read message
npm run deploy && git add . && git commit -m "$message" && git push