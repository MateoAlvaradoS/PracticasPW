class Articulo < ApplicationRecord
    has_many :comentarios, dependent: :destroy
    validates :titulo, presence: true
    validates :descripcion, presence: true, length: { minimum: 10 }
end