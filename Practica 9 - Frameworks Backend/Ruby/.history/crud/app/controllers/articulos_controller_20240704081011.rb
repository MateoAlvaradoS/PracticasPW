class ArticulosController < ApplicationController
  def index
    @articulos = Articulo.all
  end
  
  def show
    @articulo = Articulo.find(params[:id])
  end
  
  def new
    @articulo = Articulo.new
  end
  
  def create
    @articulo = Articulo.new(articulo_params)
    if @articulo.save
      redirect_to @articulo
    else
      render :new, status: :unprocessable_entity
    end
  end
  
  def edit
    @article = Articulo.find(params[:id])
  end
  
  def update
    @articulo = Articulo.find(params[:id])
    if @articulo.update(articulo_params)
      redirect_to @articulo
    else
      render :edit, status: :unprocessable_entity
    end
  end
  
  private
  def articulo_params
    params.require(:articulo).permit(:titulo, :descripcion)
  end
end