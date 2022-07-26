# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Changed verify authentication endpoint from `/me` (known issue) to `/users`.
- Changed `fetch-account` step to use the newly introduced ENV field `EMAIL`
  instead of `/me` endpoint.

## 1.0.1 - 2022-05-23

### Fixed

- Fixed duplicate key issues for step `fetch-containers`

## 1.0.0 - 2022-05-11

### Added

- Ingest new entities
  - `panoptica_account`
  - `panoptica_cluster`
  - `panoptica_container`
  - `panoptica_image`
  - `panoptica_risk`
  - `panoptica_user`
  - `panoptica_vulnerability`
- Build new relationships
  - `panoptica_account_has_cluster`
  - `panoptica_account_has_image`
  - `panoptica_account_has_user`
  - `panoptica_cluster_has_container`
  - `panoptica_cluster_has_risk`
  - `panoptica_image_has_vulnerability`
