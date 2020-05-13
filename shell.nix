{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    buildInputs = [
        pkgs.qt5.qttools
        pkgs.kdeFrameworks.kdelibs4support
    ];
}