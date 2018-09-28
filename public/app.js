//SCRAPE button click
$(document).on("click", "#scrape", function (event) {
  event.preventDefault();
  // Send the GET request.
  // if the articles-displayed div is empty, then do an ajax call to scrape the NPR news website
  // if ($(".articles-displayed").text().length == 1) {
    $.ajax("/scrape", {
      type: "GET"
    }).then(
      function () {
        console.log("scraping website");
        window.location.href = "/";
      }
    );
  // }
})

//DELETE ALL ARTICLES button click
$(document).on("click", "#deleteAll", function (event) {
  event.preventDefault();
  // Send the GET request.
  $.ajax("/delete", {
    type: "GET"
  }).then(
    function () {
      console.log("deleting all articles");
      window.location.href = "/";
    }
  );
})

//SAVE ARTICLE button click
$(document).on("click", "#saveArticle", function (event) {
  event.preventDefault();
  var id = $(this).attr("objectID");
  //Send the PUT request.
  $.ajax("/save/" + id, {
    type: "PUT"
  }).then(
    function () {
      console.log("saving article");
      window.location.href = "/";
    }
  );
})