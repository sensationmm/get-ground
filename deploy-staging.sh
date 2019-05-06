#!/usr/bin/env bash

npm run build
# npm run buildstaging

# ensure cli is on right project
gcloud config set project customer-frontend-pwa


# deploy
# --quiet to avoid prompt
gcloud app deploy --quiet


# DEPRECATED - GCS deploy
# build
# npm run build
# deploy to gcs bucket
# gsutil cp -r dist/* gs://internal.getground.co.uk
