#!/bin/bash
":" // ; exec $(if [[ -f .pid ]]; then echo /proc/`cat .pid`/exe; elif [[ -f ./node_modules/.bin/node ]]; then echo ./node_modules/.bin/node; else echo node; fi) "$0" "$@"

/**
 * quicksilver 引导文件，请勿作任何修改
 *
 * 更多信息参考 https://wiki.bytedance.net/display/TTFE/QuickSilver
 */
require('./build/build')();
