using SistemaABM_Eventos_Repository.Interface;         // Interfaces (IServiceVenue)
using SistemaABM_Eventos_TransferObject.ModelsDTO;     // DTOs
using SistemaABM_Eventos_Data;                          // DbContext
using SistemaABM_Eventos_Data.Models;                   // Entidades
using Microsoft.EntityFrameworkCore;                    // EF Core
using AutoMapper;                                       // AutoMapper

namespace SistemaABM_Eventos_Repository.Service          // 👈 asegurate que sea "Service" (con 'r')
{
    public class ServiceVenue : IServiceVenue
    {
        private readonly BDSistemaEventosContext _db;
        private readonly IMapper _mapper;

        public ServiceVenue(BDSistemaEventosContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<List<VenueDTO>> Listar()
        {
            return await _db.Venues
                .AsNoTracking()
                .Select(v => new VenueDTO(
                    v.Id,
                    v.Nombre,
                    v.Direccion,
                    v.Ciudad,
                    v.CapacidadTotal
                ))
                .ToListAsync();
        }

        public async Task<int> Crear(VenueDTO dto)
        {
            var venue = _mapper.Map<Venue>(dto);
            _db.Venues.Add(venue);
            await _db.SaveChangesAsync();
            return venue.Id;
        }

        public async Task<bool> Editar(VenueDTO dto)
        {
            var venue = await _db.Venues.FindAsync(dto.Id);
            if (venue is null)
                return false;

            venue.Nombre = dto.Nombre;
            venue.Direccion = dto.Direccion;
            venue.Ciudad = dto.Ciudad;
            venue.CapacidadTotal = dto.CapacidadTotal;

            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Eliminar(int id)
        {
            var venue = await _db.Venues.FindAsync(id);
            if (venue is null)
                return false;

            _db.Venues.Remove(venue);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
