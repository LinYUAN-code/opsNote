pub mod fs;
pub mod menu;
pub mod tray;
pub mod utils;
pub mod window_ext;

#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;

// #[link(name = "UniformTypeIdentifiers", kind = "framework")]
