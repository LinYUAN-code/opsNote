use tauri::{utils::assets::EmbeddedAssets, Context, CustomMenuItem, Menu, MenuItem, Submenu};

pub fn create_menu(context: &Context<EmbeddedAssets>) -> Menu {
    let mut menu = Menu::new();
    #[cfg(target_os = "macos")]
    {
        menu = menu.add_submenu(Submenu::new(
            context.package_info().name.clone(),
            Menu::new(),
        ))
    }
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let mut save = CustomMenuItem::new("save".to_string(), "Save");
    save = save.accelerator("command+S");
    let submenu_file = Submenu::new(
        "File",
        Menu::new().add_item(quit).add_item(close).add_item(save),
    );
    let submenu_edit = Submenu::new(
        "Edit",
        Menu::new()
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Paste)
            .add_native_item(MenuItem::Cut),
    );
    menu = menu.add_submenu(submenu_file).add_submenu(submenu_edit);
    menu
}
