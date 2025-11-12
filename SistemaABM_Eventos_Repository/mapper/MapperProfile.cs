using AutoMapper;
using SistemaABM_Eventos_Data.Models;
using SistemaABM_Eventos_TransferObject.ModelsDTO;

namespace SistemaABM_Eventos_Repository.Mapper;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        CreateMap<Venue, VenueDTO>().ReverseMap();
        CreateMap<Evento, EventoDTO>()
            .ForMember(d => d.VenueNombre, o => o.MapFrom(s => s.Venue.Nombre));
        CreateMap<EventoCreateDTO, Evento>();
        CreateMap<LoteEntrada, LoteEntradaDTO>().ReverseMap();
        CreateMap<Entrada, EntradaDTO>().ReverseMap();
        CreateMap<Compra, CompraDTO>()
            .ForMember(d => d.Entradas, o => o.MapFrom(s => s.Entradas));
    }
}