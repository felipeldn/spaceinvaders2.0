class User < ApplicationRecord
    has_many :games
    # has_many :scores, through: :games

    def scores
        self.games.map{|game| game.score}
    end
    
end
