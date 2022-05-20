# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Fixed duplicate key issues for step `fetch-containers`

## 1.0.0 - 2022-05-11

### Added

- Ingest new entities
  - `cisco_secure_application_account`
  - `cisco_secure_application_cluster`
  - `cisco_secure_application_container`
  - `cisco_secure_application_image`
  - `cisco_secure_application_risk`
  - `cisco_secure_application_user`
  - `cisco_secure_application_vulnerability`
- Build new relationships
  - `cisco_secure_application_account_has_cluster`
  - `cisco_secure_application_account_has_image`
  - `cisco_secure_application_account_has_user`
  - `cisco_secure_application_cluster_has_container`
  - `cisco_secure_application_cluster_has_risk`
  - `cisco_secure_application_image_has_vulnerability`
