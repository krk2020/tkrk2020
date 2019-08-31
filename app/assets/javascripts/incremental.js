$(document).on("turbolinks:load" ,function() {
// $(document).on(‘turbolinks:load’ ,function() {

  var search_list = $("#user-search-result");
  var member_list = $("#member_search_result");

  function appendUsers(user) {
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name=${ user.name }>追加</a>
              </div>`
    search_list.append(html);
    return html;
  }
  function appendMembers(name, user_id) {
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value=${ user_id }>
                <p class='c hat-group-user__name'>${ name }</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    member_list.append(html);
  }
  function appendNoUsers(info) {
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ info }</p>
              </div>`
    search_list.append(html);
  }
  $(function(){
    $(".chat-group-form").on("keyup",function() {
      var input = $("#user-search-field").val();
      $.ajax({
        url: '/users',
        type: 'GET',
        data: {keyword: input},
        dataType: 'json'
      })
      .done(function(users){
        $("#user-search-field").empty();
          if (users.length !== 0) {
            users.forEach(function(users){
            appendUsers(users);
            });
          }
          else {
            appendNoUsers("一致するユーザーはいません");
          }
      })
      .fail(function(){
        alert('error');
      })
    });
    $(function(){
      $(document).on('click', '.user-search-add', function() {
        var name = $(this).data("user-name");
        var user_id = $(this).data("user-id");
        $(this).parent().remove();
        appendMembers(name, user_id);
      });
        $(document).on("click", '.user-search-remove', function() {
        $(this).parent().remove();
      });
    });
  });
});