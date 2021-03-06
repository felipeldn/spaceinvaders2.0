class UsersController < ApplicationController

    def index
        user = User.all

        render json user
    end
    
    def show
        user = User.find_by(username: params[:id])
        
        render json: user
    end

    def create
        user = User.new()
        user.username = params[:user][:username]
        user.save

        render json: user
    end

end
