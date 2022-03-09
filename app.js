$(document).ready(function () {
  $(".addFilmModal").click(function () {
    $(".modal-add-film").addClass("show");
    $(".titleModal").html(`Modal Add Film`);
    $(".addToFilm").show();
    $(".updateToFilm").hide();
    $(".filmLink").val("");
    $(".filmTitle").val("");
    $(".filmText").val("");
  });
  $(".add-modal-close").click(function () {
    $(".modal-add-film").removeClass("show");
  });

  $(".addToFilm").click(function () {
    let filmLink = $(".filmLink").val();
    let filmTitle = $(".filmTitle").val();
    let filmText = $(".filmText").val();

    $(".modal-add-film").removeClass("show");
    $(".filmRow").prepend(`
<div class="col-lg-4">
<div class="card">
<img class="card-img-top" src="${$(".filmLink").val()}" alt="">
<div class="card-body">
 <h4 class="card-title">${$(".filmTitle").val()}</h4>
    <p class="card-text">${$(".filmText").val()}</p>

    <div class="row text-center">
        <div class="col">
            <button class="btn btn-outline-warning" 
            onclick="readFilm(this)">Read Me</button>
        </div>
        <div class="col">
            <button class="btn btn-outline-danger " 
            onclick="deleteFilm(this)">Delete</button>
        </div>
        <div class="col">
            <button class="btn btn-outline-success"
             onclick="updateFilm(this)">Update</button>
        </div>
        </div>
    </div>
            </div>
        </div>
            `);

    addToStorage(filmLink, filmTitle, filmText);
  });
});

//^ Sehife yuklendiyi zaman calismaga Local storage'de olan filmlerin yuklenmesi //

document.addEventListener("DOMContentLoaded", function () {
  let movie = getStorage();
  movie.forEach((f) => {
    $(".filmRow").prepend(`
          
          <div class="col-lg-4">
<div class="card">
<img class="card-img-top" src="${f.link}" alt="">
<div class="card-body">
 <h4 class="card-title">${f.title}</h4>
    <p class="card-text">${f.text}</p>

    <div class="row text-center">
        <div class="col">
            <button class="btn btn-outline-warning" 
            onclick="readFilm(this)">Read Me</button>
        </div>
        <div class="col">
            <button class="btn btn-outline-danger " 
            onclick="deleteFilm(this)">Delete</button>
        </div>
        <div class="col">
            <button class="btn btn-outline-success"
             onclick="updateFilm(this)">Update</button>
        </div>
        </div>
    </div>
            </div>
        </div>
          
          `);
  });
});

function getStorage() {
  let movie;
  if (localStorage.getItem("movie") === null) {
    movie = [];
  } else {
    movie = JSON.parse(localStorage.getItem("movie"));
  }
  return movie;
}

function addToStorage(filmLink, filmTitle, filmText) {
  let movie = getStorage();
  movie.push({
    link: filmLink,
    title: filmTitle,
    text: filmText,
  });
  localStorage.setItem("movie", JSON.stringify(movie));
}

function deleteFilm(x) {
  let filmSil = $(x).parents(".card-body").children(".card-title").text();
  let movie = getStorage();
  movie.forEach((f, index) => {
    if (f.title == filmSil) {
      movie.splice(index, 1);
      $(x).parents(".col-lg-4").remove();
    }
  });
  localStorage.setItem("movie", JSON.stringify(movie));
}

function readFilm(x) {
  $(".filmRow").hide();
  $(".haqqinda").show();

  $(".haqqinda").html(`

<h1 class="text-center my-3">Film nədən bəhs edir ?</h1>
   <div class="row">
                    <div class="col-lg-6">
                <img class="w-100 readImg" src="${$(x)
                  .parents(".card")
                  .children(".card-img-top")
                  .attr("src")}" alt="">
                    </div>
                    <div class="col-lg-6">
  <h2 class="readTitle">${$(x)
    .parents(".card-body")
    .children(".card-title")
    .html()}</h2>
                <p class="readText">
                ${$(x).parents(".card-body").children(".card-text").html()}
                        </p>
                        <button class="btn btn-dark" onclick="closeRead()"> Close</button>
                    </div>               
                </div>

`);
}

function updateFilm(x) {
  yenile = x;
  $(".modal-add-film").addClass("show");
  $(".titleModal").html(`Modal Update Film`);
  $(".updateToFilm").show();
  $(".addToFilm").hide();
  $(".filmLink").val(
    $(x).parents(".card").children(".card-img-top").attr("src")
  );
  $(".filmTitle").val(
    $(x).parents(".card-body").children(".card-title").html()
  );
  $(".filmText").val($(x).parents(".card-body").children(".card-text").html());
}

function updateToFilm() {
  $(".modal-add-film").removeClass("show");
  $(yenile)
    .parents(".card")
    .children(".card-img-top")
    .attr("src", `${$(".linkValue").children(".filmLink").val()}`);
  $(yenile)
    .parents(".card-body")
    .children(".card-title")
    .html($(".linkTitle").children(".filmTitle").val());
  $(yenile)
    .parents(".card-body")
    .children(".card-text")
    .html($(".linkText").children(".filmText").val());
}

$(".search-bar").keyup(function () {
  $(".filmRow .col-lg-4").hide();
  $(".filmRow .col-lg-4").each(function () {
    if ($(this).text().toLowerCase().includes($(".search-bar").val())) {
      $(this).show();
    }
  });
});

function closeRead() {
  $(".haqqinda").hide();
  $(".filmRow").show();
  $(".filmLink").val("");
  $(".filmTitle").val("");
  $(".filmText").val("");
}
