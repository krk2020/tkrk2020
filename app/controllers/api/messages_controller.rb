class Api::CommentsController < ApplicationController
  def index
    @message = Message.new
    @messages = Message.order('created_at ASC')
  end

  def create
    @message = Message.new(todo_params)
    if @message.save
      redirect_to :root
    else
      render :index
    end
  end

  private
  def message_params
    params.require(:todo).permit(:content)
  end
end