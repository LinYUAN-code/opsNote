use tauri::Window;

#[cfg(target_os = "macos")]
use cocoa::appkit::{NSToolbar, NSWindow, NSWindowTitleVisibility};

pub trait WindowExt {
    fn set_transparent_titlebar(&self);
    fn set_toolbar_visible(&self, visible: bool);
    fn get_toolbar_visible(&self) -> bool;
    fn window_focus_status(&self, is_focus: bool);
}

#[cfg(target_os = "macos")]
impl WindowExt for Window {
    fn set_transparent_titlebar(&self) {
        #[cfg(target_os = "macos")]
        unsafe {
            let ns_window = self.ns_window().unwrap() as cocoa::base::id;
            ns_window.setTitlebarAppearsTransparent_(cocoa::base::YES);
            ns_window.setTitleVisibility_(NSWindowTitleVisibility::NSWindowTitleHidden);
            let toolbar: cocoa::base::id = msg_send![class!(NSToolbar), new];
            ns_window.setToolbar_(toolbar);
            toolbar.setShowsBaselineSeparator_(1);
        }
    }
    fn set_toolbar_visible(&self, visible: bool) {
        #[cfg(target_os = "macos")]
        unsafe {
            let id = self.ns_window().unwrap() as cocoa::base::id;

            let v = if visible {
                cocoa::base::YES
            } else {
                cocoa::base::NO
            };
            let _: cocoa::base::id = msg_send![id.toolbar(), setVisible: v];
        }
    }
    fn get_toolbar_visible(&self) -> bool {
        #[cfg(target_os = "macos")]
        unsafe {
            let id = self.ns_window().unwrap() as cocoa::base::id;
            let res = id.toolbar().isVisible();
            if res == 1 {
                true
            } else {
                false
            }
        }
    }
    fn window_focus_status(&self, is_focus: bool) {
        #[cfg(target_os = "macos")]
        unsafe {
            // println!("toolbar {}", self.get_toolbar_visible());
            self.set_toolbar_visible(true);
        }
    }
}
