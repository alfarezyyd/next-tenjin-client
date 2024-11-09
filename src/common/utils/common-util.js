export class CommonUtil {
  static parseJwt(token) {
    if (!token) {
      return;
    }
    console.log(token)

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    try {
      return JSON.parse(window.atob(base64));
    } catch (e) {
      return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    }
  }

  static uploadPreview($) {
    $.uploadPreview({
      input_field: "#image-upload",   // Default: .image-upload
      preview_box: "#image-preview",  // Default: .image-preview
      label_field: "#image-label",    // Default: .image-label
      label_default: "Choose File",   // Default: Choose File
      label_selected: "Change File",  // Default: Change File
      no_label: false,                // Default: false
      success_callback: null          // Default: null
    });
  }
}