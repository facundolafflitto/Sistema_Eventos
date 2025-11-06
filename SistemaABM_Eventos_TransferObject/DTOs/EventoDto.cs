using System;
using System.Collections.Generic;
using SistemaABM_Eventos_TransferObject.Compras;
using SistemaABM_Eventos_TransferObject.Entradas;
using SistemaABM_Eventos_TransferObject.Lotes;
using SistemaABM_Eventos_TransferObject.Usuarios;
using SistemaABM_Eventos_TransferObject.Venues;

namespace SistemaABM_Eventos_TransferObject.Eventos;

public class EventoDto
{
    public int EventoId { get; set; }

    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }

    public string? Codigo { get; set; }

    public string? Estado { get; set; }

    public DateTime FechaInicio { get; set; }

    public DateTime FechaFin { get; set; }

    public int VenueId { get; set; }

    public int OrganizadorId { get; set; }

    public string? VenueNombre { get; set; }

    public VenueDto? Venue { get; set; }

    public UsuarioDto? Organizador { get; set; }

    public ICollection<LoteDto> Lotes { get; set; } = new List<LoteDto>();

    public ICollection<EntradaDto> Entradas { get; set; } = new List<EntradaDto>();

    public ICollection<CompraDto> Compras { get; set; } = new List<CompraDto>();
}