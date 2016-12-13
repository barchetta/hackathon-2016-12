# Initialize 

# Project id in Google Cloud
_project_id=ecstatic-magpie-152317

# Repository hostname in Google Cloud
_gcr_hostname=us.gcr.io

# User to associate with docker image. Used for tagging only.
_user=jdipol

# Simple docker image name
_imagename=server.js

# Fully qualified docker image name in my GCR repository
_gcloud_imagename=${_gcr_hostname}/${_project_id}/${_imagename}

