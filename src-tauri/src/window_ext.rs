use tauri::Window;

#[cfg(target_os = "macos")]
use cocoa::appkit::{NSToolbar, NSWindow, NSWindowTitleVisibility};

#[cfg(target_os = "windows")]
use webview2_com::Microsoft::Web::WebView2::Win32::{
    ICoreWebView2Controller, ICoreWebView2Controller2, COREWEBVIEW2_COLOR,
};
#[cfg(target_os = "windows")]
use window_shadows::set_shadow;
#[cfg(target_os = "windows")]
use windows::core::Interface;

pub trait WindowExt {
    fn set_transparent_titlebar(&self);
    fn set_toolbar_visible(&self, visible: bool);
    fn get_toolbar_visible(&self) -> bool;
    fn window_focus_status(&self, is_focus: bool);
}

#[cfg(target_os = "macos")]
impl WindowExt for Window {
    fn set_transparent_titlebar(&self) {
        unsafe {
            let ns_window = self.ns_window().unwrap() as cocoa::base::id;
            ns_window.setTitlebarAppearsTransparent_(cocoa::base::YES);
            ns_window.setTitleVisibility_(NSWindowTitleVisibility::NSWindowTitleHidden);
            let toolbar: cocoa::base::id = msg_send![class!(NSToolbar), new];
            ns_window.setToolbar_(toolbar);
            toolbar.setShowsBaselineSeparator_(1);
        }
    }
    fn set_background(&self) {}
    fn set_toolbar_visible(&self, visible: bool) {
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
        unsafe {
            // println!("toolbar {}", self.get_toolbar_visible());
            self.set_toolbar_visible(true);
        }
    }
}

#[cfg(target_os = "windows")]
impl WindowExt for Window {
    fn set_transparent_titlebar(&self) {
        unsafe {
            self.set_decorations(false).ok();
            set_shadow(&self, true).unwrap();
        }
    }
    fn set_toolbar_visible(&self, visible: bool) {
        unsafe {}
    }
    fn get_toolbar_visible(&self) -> bool {
        unsafe { true }
    }
    fn window_focus_status(&self, is_focus: bool) {
        unsafe {}
    }
}
