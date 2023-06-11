<p align="center">
  <a>
    <img src="../frontend/src/assets/images/Logo_water_support_sf_1.png" width="400" alt="Water Support">
  </a>
</p>
<p align="center">
    <a href="https://github.com/gear-tech/gear-js/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-GPL%203.0-success"></a>
</p>
<hr>

## Description
Smart contract made for the Water Support dApp, using the template for NFT provided by the gear team.

## Building Locally

### ⚙️ Install Rust

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### ⚒️ Add specific toolchains

```shell
rustup toolchain add nightly
rustup target add wasm32-unknown-unknown --toolchain nightly
```

### 🏗️ Build

```shell
cargo build --release
```

## License

The source code is licensed under the [MIT license](LICENSE).
