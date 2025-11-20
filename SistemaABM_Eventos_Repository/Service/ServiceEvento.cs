using SistemaABM_Eventos_Repository.Interface;
using SistemaABM_Eventos_TransferObject.ModelsDTO;
using SistemaABM_Eventos_Data;
using SistemaABM_Eventos_Data.Models;
using Microsoft.EntityFrameworkCore;

namespace SistemaABM_Eventos_Repository.Service;

public class ServiceEvento : IServiceEvento
{
    private readonly BDSistemaEventosContext _db;
    public ServiceEvento(BDSistemaEventosContext db) => _db = db;

    public async Task<List<EventoDTO>> Listar(string? query, DateTime? desde, DateTime? hasta, int page, int pageSize)
    {
        var q = _db.Eventos
                   .AsNoTracking()
                   .Include(e => e.Venue)
                   .AsQueryable();

        if (!string.IsNullOrWhiteSpace(query))
        {
            var ql = query.ToLower();
            q = q.Where(e =>
                e.Nombre.ToLower().Contains(ql) ||
                e.Venue.Nombre.ToLower().Contains(ql) ||
                e.Venue.Ciudad.ToLower().Contains(ql)
            );
        }

        if (desde is not null)
            q = q.Where(e => e.FechaHora >= desde);

        if (hasta is not null)
            q = q.Where(e => e.FechaHora <= hasta);

        return await q.OrderBy(e => e.FechaHora)
                      .Skip((page - 1) * pageSize)
                      .Take(pageSize)
                      .Select(e => new EventoDTO(
                          e.Id,
                          e.Nombre,
                          e.Descripcion,
                          e.FechaHora,
                          e.VenueId,
                          e.Venue.Nombre,
                          e.Categoria,
                          e.ImagenPortadaUrl
                      ))
                      .ToListAsync();
    }

    public async Task<EventoDTO?> Obtener(int id) =>
        await _db.Eventos
                 .AsNoTracking()
                 .Include(e => e.Venue)
                 .Where(e => e.Id == id)
                 .Select(e => new EventoDTO(
                     e.Id,
                     e.Nombre,
                     e.Descripcion,
                     e.FechaHora,
                     e.VenueId,
                     e.Venue.Nombre,
                     e.Categoria,
                     e.ImagenPortadaUrl
                 ))
                 .FirstOrDefaultAsync();

public async Task<int> Crear(EventoCreateDTO dto)
{
    var fecha = dto.FechaHora;
    var fechaMinima = new DateTime(2025, 1, 1);
    if (fecha < fechaMinima)
        throw new InvalidOperationException("La fecha debe ser desde el año 2025 en adelante.");

    var e = new Evento
    {
        Nombre = dto.Nombre,
        Descripcion = dto.Descripcion,
        FechaHora = fecha,
        VenueId = dto.VenueId,
        Categoria = dto.Categoria,
        ImagenPortadaUrl = dto.ImagenPortadaUrl
    };

    _db.Eventos.Add(e);
    await _db.SaveChangesAsync();

    var lotes = new List<LoteEntrada>
    {
        new LoteEntrada { EventoId = e.Id, Nombre = "Early Bird", Precio = 3000, Cupo = 100, Vendidas = 0 },
        new LoteEntrada { EventoId = e.Id, Nombre = "Lote Early Bird", Precio = 3500, Cupo = 100, Vendidas = 0 },
        new LoteEntrada { EventoId = e.Id, Nombre = "Lote Anticipado", Precio = 4000, Cupo = 100, Vendidas = 0 },
        new LoteEntrada { EventoId = e.Id, Nombre = "General", Precio = 5000, Cupo = 100, Vendidas = 0 },
        new LoteEntrada { EventoId = e.Id, Nombre = "Lote General", Precio = 5000, Cupo = 100, Vendidas = 0 },
        new LoteEntrada { EventoId = e.Id, Nombre = "Lote General 2", Precio = 5200, Cupo = 100, Vendidas = 0 },
        new LoteEntrada { EventoId = e.Id, Nombre = "Lote Última Hora", Precio = 6000, Cupo = 100, Vendidas = 0 },
        new LoteEntrada { EventoId = e.Id, Nombre = "Lote VIP", Precio = 8000, Cupo = 100, Vendidas = 0 },
        new LoteEntrada { EventoId = e.Id, Nombre = "VIP", Precio = 9000, Cupo = 100, Vendidas = 0 },
        new LoteEntrada { EventoId = e.Id, Nombre = "Lote Fan Pack", Precio = 9500, Cupo = 100, Vendidas = 0 },
        new LoteEntrada { EventoId = e.Id, Nombre = "Lote Premium", Precio = 12000, Cupo = 100, Vendidas = 0 },
        new LoteEntrada { EventoId = e.Id, Nombre = "Lote Ultra", Precio = 15000, Cupo = 100, Vendidas = 0 },
        new LoteEntrada { EventoId = e.Id, Nombre = "Lote Backstage Experience", Precio = 20000, Cupo = 100, Vendidas = 0 }
    };

    _db.Lotes.AddRange(lotes);
    await _db.SaveChangesAsync();

    return e.Id;
}



    public async Task<bool> Editar(int id, EventoCreateDTO dto)
    {
        var e = await _db.Eventos.FindAsync(id);
        if (e is null) return false;

        e.Nombre = dto.Nombre;
        e.Descripcion = dto.Descripcion;
        e.FechaHora = dto.FechaHora;
        e.VenueId = dto.VenueId;
        e.Categoria = dto.Categoria;
        e.ImagenPortadaUrl = dto.ImagenPortadaUrl;

        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> Eliminar(int id)
    {
        var e = await _db.Eventos.FindAsync(id);
        if (e is null) return false;

        _db.Eventos.Remove(e);
        await _db.SaveChangesAsync();
        return true;
    }
}
