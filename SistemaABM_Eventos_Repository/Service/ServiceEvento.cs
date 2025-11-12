using SistemaABM_Eventos_Repository.Interface;         // <- ESTE
using SistemaABM_Eventos_TransferObject.ModelsDTO;     // DTOs
using SistemaABM_Eventos_Data;                          // DbContext
using SistemaABM_Eventos_Data.Models;                   // Entidades (si las usás directo)
using Microsoft.EntityFrameworkCore;                    // EF Core

namespace SistemaABM_Eventos_Repository.Service;

public class ServiceEvento : IServiceEvento
{
    private readonly BDSistemaEventosContext _db;
    public ServiceEvento(BDSistemaEventosContext db) => _db = db;

    public async Task<List<EventoDTO>> Listar(string? query, DateTime? desde, DateTime? hasta, int page, int pageSize)
    {
        var q = _db.Eventos.AsNoTracking().Include(e => e.Venue).AsQueryable();
        if (!string.IsNullOrWhiteSpace(query))
        {
            var ql = query.ToLower();
            q = q.Where(e => e.Nombre.ToLower().Contains(ql) || e.Venue.Nombre.ToLower().Contains(ql) || e.Venue.Ciudad.ToLower().Contains(ql));
        }
        if (desde is not null) q = q.Where(e => e.FechaHora >= desde);
        if (hasta is not null) q = q.Where(e => e.FechaHora <= hasta);

        return await q.OrderBy(e => e.FechaHora)
            .Skip((page - 1) * pageSize).Take(pageSize)
            .Select(e => new EventoDTO(e.Id, e.Nombre, e.Descripcion, e.FechaHora, e.VenueId, e.Venue.Nombre, e.Categoria, e.ImagenPortadaUrl))
            .ToListAsync();
    }

    public async Task<EventoDTO?> Obtener(int id) =>
        await _db.Eventos.AsNoTracking().Include(e => e.Venue)
            .Where(e => e.Id == id)
            .Select(e => new EventoDTO(e.Id, e.Nombre, e.Descripcion, e.FechaHora, e.VenueId, e.Venue.Nombre, e.Categoria, e.ImagenPortadaUrl))
            .FirstOrDefaultAsync();

    public async Task<int> Crear(EventoCreateDTO dto)
    {
        if (dto.FechaHora < DateTime.UtcNow.AddMinutes(-1)) throw new InvalidOperationException("Fecha inválida.");
        var e = new Evento { Nombre = dto.Nombre, Descripcion = dto.Descripcion, FechaHora = dto.FechaHora, VenueId = dto.VenueId, Categoria = dto.Categoria, ImagenPortadaUrl = dto.ImagenPortadaUrl };
        _db.Eventos.Add(e); await _db.SaveChangesAsync(); return e.Id;
    }

    public async Task<bool> Editar(int id, EventoCreateDTO dto)
    {
        var e = await _db.Eventos.FindAsync(id); if (e is null) return false;
        e.Nombre = dto.Nombre; e.Descripcion = dto.Descripcion; e.FechaHora = dto.FechaHora; e.VenueId = dto.VenueId; e.Categoria = dto.Categoria; e.ImagenPortadaUrl = dto.ImagenPortadaUrl;
        await _db.SaveChangesAsync(); return true;
    }

    public async Task<bool> Eliminar(int id)
    {
        var e = await _db.Eventos.FindAsync(id); if (e is null) return false;
        _db.Eventos.Remove(e); await _db.SaveChangesAsync(); return true;
    }
}
