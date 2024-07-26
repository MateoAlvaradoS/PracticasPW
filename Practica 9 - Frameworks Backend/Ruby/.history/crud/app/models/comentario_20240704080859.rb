class Comentario < ApplicationRecord
  belongs_to :articulo
  validates :titulo, presence: true
  validates :cuerpo, presence: true
end