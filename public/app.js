//SCRAPE button click
$(document).on("click", "#scrape", function (event) {
  event.preventDefault();
  // Send the GET request.
    $.ajax("/scrape", {
      type: "GET"
    }).then(
      function () {
        console.log("scraping website");
        window.location.href = "/";
      }
    );
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

//SAVE ARTICLE button click
$(document).on("click", ".commentArticle", function (event) {
  event.preventDefault();
  var id = $(this).attr("objectID");
  var name = $("#" + id + "Name").val();
  var message = $("#" + id + "Message").val();

  var newComment = {
    name: name,
    message: message
  }
  console.log(newComment);
  //Send the POST request.
  $.ajax("/comments/" + id, {
    type: "POST",
    data: newComment
  }).then(
    function () {
      console.log("posting new comment");
      window.location.href = "/saved";
    }
  );
})

//DELETE COMMENT button click
$(document).on("click", ".deleteComment", function (event) {
  event.preventDefault();
  var id = $(this).attr("objectID");

  $.ajax("/deletecomment/" + id, {
    type: "GET"
  }) .then(
    function () {
      console.log("deleting comment");
      window.location.href = "/saved";
    }
  )
})