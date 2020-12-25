class GamesController < ApplicationController

    def index
        games = Game.all
    end
    
    def create
        game = Game.create(user_id: params[:user_id], score: 0)

        render json: game
    end

	def show
        game = Game.find_by(id: params[:id])       

        render json: game
    end

    def update
        game = Game.find_by(id: params[:id])
        game.score = params[:score]
        game.save

        render json: game
    end

end
