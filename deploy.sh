#!/bin/bash
#어드민 id

pnpm build && aws s3 sync --profile=ihomet dist s3://ihomet-admin-web
aws cloudfront --profile=ihomet create-invalidation --distribution-id E2CIT3SQW88H5X --paths "/*"



