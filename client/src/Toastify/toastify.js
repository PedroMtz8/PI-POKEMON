import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export function showMessage(message, type){
    Toastify({
        text: message,
        duration: type === "success" ? 5000 : 3000,
        close: true,
        className: "info",
        offset: {
            y: 70 // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        style: {
          background: type === "success" ?   "rgb(50, 196, 50)" :  "red",
          borderRadius: "10px",
          width: "max-content"
          
        }
      }).showToast();
}