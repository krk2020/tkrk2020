$(function(){
  function buildPost(post){
    var imagefile = post.image.url? `<img src="${post.image.url}" lower-message__image">` : ``;
    var html = `<div class="message">
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
                    ${imagefile}
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
});