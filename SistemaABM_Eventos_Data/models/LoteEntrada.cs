namespace SistemaABM_Eventos_Data.Models
{
    public class LoteEntrada
    {
        public int Id { get; set; }
        public int EventoId { get; set; }
        public Evento Evento { get; set; } = null!;
        public string Nombre { get; set; } = "";
        public decimal Precio { get; set; }
        public int Cupo { get; set; }
        public int Vendidas { get; set; }
    }
}
