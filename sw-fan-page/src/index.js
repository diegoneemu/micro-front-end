function component() {
  const element = document.createElement("div");

  element.innerHTML = "Comming soon a Star Wars fan page";

  return element;
}

document.getElementById("root").appendChild(component());
