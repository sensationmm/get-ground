# getground/customer-frontend-pwa:2.0.1


FROM golang:1.12

RUN curl -sSL https://sdk.cloud.google.com | bash

ENV PATH $PATH:/root/google-cloud-sdk/bin
