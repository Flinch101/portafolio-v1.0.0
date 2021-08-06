const grid = new Muuri('.grid',{
  rounding: false
});

window.addEventListener('load',() => {
  setTimeout(() => {
    document.querySelector('.inicializando').style.display = "none";
    document.querySelector('.contenedor').style.display = "block";
    document.querySelector('footer').style.display = "block";

    grid.refreshItems().layout();
    document.getElementById('grid').classList.add("imagenes-cargadas");

    // Listener filtrado por categoria;
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento) => {
      elemento.addEventListener("click",(evt) => {
        evt.preventDefault();
        // for(let i=0; i<enlaces.length; i++){
        //   enlaces[i].classList.remove('activo');
        // }
        /* ECMASCRIPT: */ enlaces.forEach((enlace) => {enlace.classList.remove('activo')})
        evt.target.classList.add('activo');

        const categoria = evt.target.innerHTML.toLowerCase();
        categoria === "todos" ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
      });
    });

    // Listener filtrado por barra de busqueda;
    document.querySelector('#barra-busqueda').addEventListener('input',(evt) => { // input es cada que borre/escriba algo en el input
      const busqueda = evt.target.value;

      // EXTRA
      if(busqueda == " " || busqueda == ""){
        evt.target.value = "";
        grid.filter('[data-categoria]');
      }
      else{
        // normal
        if(busqueda)
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));
      
        // EXTRA
        const enlaces = document.querySelectorAll('#categorias a');
        enlaces.forEach((enlace) => {enlace.classList.remove('activo')});
        enlaces[0].classList.add('activo');
      }
    });

    // Listener menu emergente
    const overlay = document.getElementById("overlay");
    document.querySelectorAll('.grid .item img').forEach((element) => {
      element.addEventListener("click",function(e){
        // var img = overlay.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling;
        // var descripcionNode = overlay.firstChild.nextSibling.nextSibling.nextSibling;

        // img.src = ruta;
        // descripcionNode.textContent = descripcion;
        
        // overlay.classList.add("activo");

        // window.addEventListener("click",function(e){
        //   if(e.target == overlay){
        //     overlay.classList.remove("activo");
        //   }
        // });

        const ruta = element.getAttribute("src");
        const descripcion = element.parentNode.parentNode.dataset.descripcion;

        overlay.classList.add("activo");
        document.querySelector('#overlay img').src = ruta;
        document.querySelector('#overlay .descripcion').innerHTML = descripcion;
      });
    });

    document.querySelector('#btn-cerrar-popup').addEventListener("click",function(){
      overlay.classList.remove("activo");
    });

    overlay.addEventListener("click",function(evt){
      // overlay.classList.remove("activo");
      evt.target.id === 'overlay' ? overlay.classList.remove("activo") : '';
    });
    },1500);
});