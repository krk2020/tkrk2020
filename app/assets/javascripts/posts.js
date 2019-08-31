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
    .done(function(data){
      var html = buildPost(data);
      $('.messages').append(html);
      $('.input-box__text').val('');
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      $("form")[0].reset();
      
      
    })
    .fail(function(data){
      alert('error');
      
      
    })
    .always(function() {
      $("form").prop('disabled', false);
    })
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      
      var last_message_id = $('.message:last').data("message-id");
      if (!last_message_id) {
        last_message_id = 0
      }

      console.log(last_message_id);
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
    .fail(function(messages) {
      alert('error');
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);
    })
    }
  };
  setInterval(reloadMessages, 5000);
  
});
