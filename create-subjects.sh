#!/bin/bash

sort subjects-dirty | uniq > subjects
cat subjects-ante subjects subjects-post > subjects.js