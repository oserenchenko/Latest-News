$(document).on("click", "#scrape", function (event) {
  event.preventDefault();
  // Send the GET request.
  // if the articles-displayed div is empty, then do an ajax call to scrape the NPR news website
  if ($(".articles-displayed").text().length == 1) {
    $.ajax("/scrape", {
      type: "GET"
    }).then(
      function () {
        console.log("scraping website");
        window.location.href = "/";
      }
    );
  }
})