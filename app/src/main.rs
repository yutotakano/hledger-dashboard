// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

#[cfg(target_os = "windows")]
use window_vibrancy::apply_mica;

#[cfg(target_os = "macos")]
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            #[cfg(target_os = "windows")]
            apply_mica(&window, Some(false))
                .expect("Unsupported platform! 'apply_mica' is only supported on Windows");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_hledger_version,
            execute_hledger_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_hledger_version() -> Result<String, String> {
    std::process::Command::new("hledger")
        .arg("--version")
        .output()
        .map_err(|err| format!("failed to run hledger --version: {}", err.to_string()))
        .and_then(|output| {
            String::from_utf8(output.stdout)
                .map_err(|_| "failed to convert hledger --version output to string".to_string())
        })
}

#[tauri::command]
fn execute_hledger_command(command: Vec<String>) -> Result<String, String> {
    std::process::Command::new("hledger")
        .args(command)
        .output()
        .map_err(|err| format!("failed to run hledger: {}", err.to_string()))
        .and_then(|output| {
            String::from_utf8(output.stdout)
                .map_err(|_| "failed to convert hledger output to string".to_string())
        })
}
