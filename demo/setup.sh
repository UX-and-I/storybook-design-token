#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
BOLD=$(tput bold)
NORMAL=$(tput sgr0)

echo "${BOLD}Setting up storybook-design-token addon dev environment …${NORMAL}"

cd $SCRIPT_DIR/../addon
rm -rf node_modules
yarn > /dev/null 2>&1
yarn link --silent > /dev/null 2>&1

cd $SCRIPT_DIR
rm -rf node_modules
yarn > /dev/null 2>&1
yarn link --silent storybook-design-token

cd $SCRIPT_DIR/node_modules/react
yarn link --silent > /dev/null 2>&1

cd $SCRIPT_DIR/node_modules/react-dom
yarn link --silent > /dev/null 2>&1

cd $SCRIPT_DIR/../addon
yarn link --silent react
yarn link --silent react-dom

echo "${BOLD}Done!${NORMAL}"