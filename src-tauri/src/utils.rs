#[cfg(target_os = "macos")]
use cocoa::{
    base::{id, nil},
    foundation::NSString,
};

use std::ffi::CStr;

pub fn c_str_to_string(c_buf: *const i8) -> String {
    let c_str: &CStr = unsafe { CStr::from_ptr(c_buf) };
    let str_slice: &str = c_str.to_str().unwrap();
    str_slice.to_owned()
}

#[cfg(target_os = "macos")]
pub fn string_to_nsstring(s: String) -> id {
    unsafe {
        let ns_id: id = NSString::alloc(nil).init_str(&s);
        ns_id
    }
}
