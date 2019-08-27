$(function(){
  
  function buildPost(post){
    
    image = (post.image) ? `<img class= "lower-message__image" src=${post.image} >` : "";
    var html = `<div class="message" data-message-id="${post.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${post.name}
                    </div>
                    <div class="upper-message__date">
                      ${post.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${post.content}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }
  
  $(".new_message").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildPost(message);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      $("form")[0].reset();
      
      
    })
    .fail(function(){
      alert('error');
    })
    .always(() => {
      $('input').removeAttr("disabled");
    })
  })



  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");
      console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function (message) {
        insertHTML = buildPost(message);
        
        $('.messages').append(insertHTML);
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      console.log('error');
    });
    }
  };
  setInterval(reloadMessages, 5000);
});
