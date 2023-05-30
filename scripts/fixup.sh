#!/usr/bin/env bash
# See: https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html

cat >lib/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF

cat >lib/esm/package.json <<!EOF
{
    "type": "module"
}
!EOF
