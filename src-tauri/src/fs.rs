#[cfg(target_os = "macos")]
use crate::utils::{c_str_to_string, string_to_nsstring};
#[cfg(target_os = "macos")]
use cocoa::{
    appkit::{NSApp, NSOpenPanel, NSSavePanel},
    base::id,
    foundation::NSString,
    foundation::{NSArray, NSURL},
};
use std::fs;

// 写的时候没注意看其实tauri已经实现了
// windos上实现的话可以通过link windows库进行调用 实例化句柄实现
#[tauri::command]
pub fn open_file_selector(
    is_directory_mode: bool,
    allow_select_multiple_files: bool,
    allows_file_type: Vec<String>,
) -> Vec<String> {
    println!("[open_file_selector]");
    #[cfg(target_os = "macos")]
    unsafe {
        let open_panel = NSOpenPanel::openPanel(NSApp());
        if is_directory_mode {
            open_panel.setCanChooseDirectories_(1);
            open_panel.setCanChooseFiles_(0);
        } else {
            open_panel.setCanChooseDirectories_(0);
            open_panel.setCanChooseFiles_(1);
        }
        if allow_select_multiple_files {
            open_panel.setAllowsMultipleSelection_(1);
        }
        if allows_file_type.len() != 0 {
            let mut array: id = msg_send![class!(NSArray), array];
            for type_s in allows_file_type {
                let nsstring_type = string_to_nsstring(type_s);
                // println!("{:?}", class!(UTType));
                let uttype: id =
                    msg_send![class!(UTType), typeWithFilenameExtension: nsstring_type];
                let identifier: id = msg_send![uttype, identifier];
                // println!("identifier {:?}", c_str_to_string(identifier.UTF8String()));
                array = msg_send![array, arrayByAddingObject: uttype];
            }
            let _: id = msg_send![open_panel, setAllowedContentTypes: array];
        }
        open_panel.runModal();
        let res_id = open_panel.URLs();
        let num = res_id.count();
        let mut ans = Vec::new();
        for i in 0..num {
            // println!("{:?}", res_id.objectAtIndex(i));
            ans.push(c_str_to_string(res_id.objectAtIndex(i).path().UTF8String()));
        }
        // println!("{:?}", ans);
        ans
    }

    #[cfg(target_os = "windows")]
    unsafe {
        let mut ans = vec![];
        println!("open_file_selector");
        ans
    }
}

#[tauri::command]
pub fn read_file(path: String) -> Result<String, String> {
    if let Ok(read_res) = fs::read(path) {
        Ok(String::from_utf8_lossy(&read_res).to_string())
    } else {
        Err(String::from("[open_file]: read file error"))
    }
}

#[tauri::command]
pub fn write_file(path: String, content: String) -> Result<(), String> {
    if let Ok(()) = fs::write(path, content.as_bytes()) {
        Ok(())
    } else {
        Err(String::from("[write_file]: write file error"))
    }
}

#[tauri::command]
pub fn read_dir(path: String) -> Result<Vec<String>, String> {
    let mut ans: Vec<String> = Vec::new();
    if let Ok(dir_results) = fs::read_dir(path) {
        for entry in dir_results {
            if let Ok(entry) = entry {
                let path = entry.path();
                if path.is_dir() {
                    let mut res_path = String::from("0");
                    res_path.push_str(path.to_string_lossy().to_string().as_str());
                    ans.push(res_path);
                } else {
                    ans.push(path.to_string_lossy().to_string());
                }
            } else {
                return Err(String::from("[read_dir]: read dir error"));
            }
        }
        Ok(ans)
    } else {
        Err(String::from("[read_dir]: read dir error"))
    }
}

#[tauri::command]
pub fn create_dir(path: String, content: String) -> Result<(), String> {
    if let Ok(()) = fs::write(path, content.as_bytes()) {
        Ok(())
    } else {
        Err(String::from("[write_file]: write file error"))
    }
}
