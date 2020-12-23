class ScoresController < ApplicationController
    
    def index
        scores = Score.all
        
        render json: scores
    end

    def show
        score = Score.find_by(user_id: params[:user_id])

        render json: score
    end
    
end
