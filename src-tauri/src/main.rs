#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use app::{fs::*, menu::create_menu, tray::create_tray, window_ext::WindowExt};
use tauri::{generate_handler, LogicalSize, Manager, SystemTrayEvent, Window, WindowEvent};

fn main() {
    let builder = tauri::Builder::default();
    let context = tauri::generate_context!();
    let tray = create_tray();
    let menu = create_menu(&context);

    let builder = builder.setup(|app| {
        let main_window = app.get_window("main").unwrap();
        // 设置标题栏隐藏
        main_window.set_transparent_titlebar();
        Ok(())
    });

    builder
        .on_page_load(|w: Window, _| w.show().unwrap())
        .on_window_event(|event| match event.event() {
            WindowEvent::Resized(_) | WindowEvent::Moved(_) => {
                let window = event.window();
                #[cfg(any(target_os = "windows", target_os = "macos"))]
                {
                    // 设置标题栏隐藏
                    window.set_transparent_titlebar();
                }
                #[cfg(target_os = "macos")]
                {
                    let monitor = window.current_monitor().unwrap().unwrap();
                    let screen = monitor.size();
                    let size = &window.outer_size().unwrap();
                    event.window().set_toolbar_visible(size != screen);
                }
            }
            WindowEvent::Focused(is_focus) => {
                let window = event.window();
                #[cfg(target_os = "macos")]
                {
                    window.window_focus_status(is_focus.to_owned())
                }
            }
            _ => {}
        })
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "quit" => {
                std::process::exit(0);
            }
            "close" => {
                event.window().close().unwrap();
            }
            "save" => {
                // println!("save shortcut");
                // if let Err(err) = event.window().eval("window['handleRustEvent']('save')") {
                //     println!("shortcut save error: {:?}", err);
                // }
            }
            _ => {}
        })
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a left click");
            }
            SystemTrayEvent::RightClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a right click");
            }
            SystemTrayEvent::DoubleClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a double click");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                "hide" => {
                    let window = app.get_window("main").unwrap();
                    window.hide().unwrap();
                }
                "about" => {
                    println!("click about");
                    // 判断用户没有关闭之前的窗口
                    let about_window = app.get_window("about");
                    if about_window.is_some() {
                        return;
                    }
                    let about_window = tauri::WindowBuilder::new(
                        app,
                        "about", /* the unique window label */
                        tauri::WindowUrl::App("/about/index.html".parse().unwrap()),
                    )
                    .build()
                    .expect("failed to build window");
                    about_window
                        .set_size(LogicalSize {
                            width: 300,
                            height: 150,
                        })
                        .unwrap();
                    about_window.set_title("about me").unwrap();
                    about_window.show().unwrap();
                }
                _ => {}
            },
            _ => {}
        })
        .invoke_handler(generate_handler![
            open_file_selector,
            read_file,
            write_file,
            read_dir
        ])
        .run(context)
        .expect("error while running tauri application");
}
