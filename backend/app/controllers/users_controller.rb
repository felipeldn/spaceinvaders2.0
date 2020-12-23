class UsersController < ApplicationController

    def index
        user = User.all
    end
    
    def show
        user = User.find_by(username: params[:username])

        render json: user
    end

    def create
        user = User.new()
        user.username = params[:user][:username]
        user.save

        render json: user
    end

end
