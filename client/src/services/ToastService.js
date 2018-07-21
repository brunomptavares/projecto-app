import Toastr from 'vue-toastr';

// toast basic options
var toastOptions = {
  //"preventDuplicates": true,
  "closeButton": true,
  "clickClose": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "position": "toast-bottom-right",
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

function basicToast(title, msg, type) {
  // shallow copy, nested objects are still copied as references
  let toast = Object.assign({}, toastOptions); 
  // add the basic info to display in the toast
  toast["title"] = title
  toast["msg"] = msg
  toast["type"] = type
  return toast
}

export default {
  toast(toastr, title, msg, type) {
    let toast = basicToast(title, msg, type)
    // render toast using the toastr plugin
    toastr.Add(toast)
  },
  toastFromResponse(toastr, res) {
    // shallow copy, nested objects are still copied as references
    let toast = basicToast(
      res.data.success ? "Successo" : "Erro",
      res.data.msg,
      res.data.success ? "success" : "error")
    // render toast using the toastr plugin
    toastr.Add(toast)
  }
}