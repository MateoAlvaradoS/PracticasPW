namespace WebApiPersonas.Modelo
{
    public class Persona
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Apellido { get; set; }
        public required int Edad { get; set; }
        public required string Email { get; set; }
        public required string Telefono { get; set; }
    }
}
