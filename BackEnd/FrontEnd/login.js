function check(form) {
  if (form.userid.value == 7 && form.pswrd.value == "alice") {
    window.open("index.html", "_self");
  } else {
    alert("Error Password or Username");
  }
}
