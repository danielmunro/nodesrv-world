#!/usr/bin/env bash

#docker run --rm -v ${PWD}:/local swaggerapi/swagger-codegen-cli generate \
#    -i /local/swagger.yaml \
#    -l swagger \
#    -o /local/build

rm -r build/out/*

docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate \
    -i /local/swagger.yaml \
    -g typescript-inversify \
    -o /local/build/out/typescript \
    --skip-validate-spec
