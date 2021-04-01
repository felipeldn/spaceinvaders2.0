class UsersController < ApplicationController

    def index
        user = User.all

        render json: user
    end
    
    def show
        user = User.find_by(username: params[:id])
        # # find aall the games, and map the scores, then sum the scores
        # # json, include: score
        # # user_scores_arr = user.games.map{|game| game.score}
        # total_score = user.scores.sum
        render json: user
    end

    def create
        user = User.new()
        user.username = params[:user][:username]
        user.save

        render json: user
    end

    # def highscores
    #     user = User.find_by(username: params[:id])
    #     userGames = user.games
    #     userScores = userGames.map{|games| games.score} 
        
    #     render json: userScores
    # end

end
