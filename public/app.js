$(document).on("click", "#scrape", function (event) {
  event.preventDefault();
  // Send the GET request.
  $.ajax("/scrape", {
    type: "GET"
  }).then(
    function () {
      console.log("scraping website");
      window.location.href = "/articles";
    }
  );
})