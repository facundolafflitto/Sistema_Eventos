using AutoMapper;
using SistemaABM_Eventos_Data.Models;
using SistemaABM_Eventos_TransferObject.Compras;
using SistemaABM_Eventos_TransferObject.Entradas;
using SistemaABM_Eventos_TransferObject.Eventos;
using SistemaABM_Eventos_TransferObject.Lotes;
using SistemaABM_Eventos_TransferObject.Usuarios;
using SistemaABM_Eventos_TransferObject.Venues;

namespace SistemaABM_Eventos_Repository.Mapper;

public class EventoProfile : Profile
{
    public EventoProfile()
    {
        CreateMap<Venue, VenueDto>()
            .ReverseMap()
            .ForMember(dest => dest.Eventos, opt => opt.Ignore());

        CreateMap<Usuario, UsuarioDto>()
            .ReverseMap()
            .ForMember(dest => dest.EventosOrganizados, opt => opt.Ignore())
            .ForMember(dest => dest.Compras, opt => opt.Ignore());

        CreateMap<Entrada, EntradaDto>()
            .ReverseMap()
            .ForMember(dest => dest.Lote, opt => opt.Ignore())
            .ForMember(dest => dest.Compra, opt => opt.Ignore());

        CreateMap<DetalleCompra, DetalleCompraDto>()
            .ReverseMap()
            .ForMember(dest => dest.Compra, opt => opt.Ignore())
            .ForMember(dest => dest.Lote, opt => opt.Ignore());

        CreateMap<Compra, CompraDto>()
            .ForMember(dest => dest.Usuario, opt => opt.MapFrom(src => src.Usuario))
            .ReverseMap()
            .ForMember(dest => dest.Usuario, opt => opt.Ignore())
            .ForMember(dest => dest.Evento, opt => opt.Ignore())
            .ForMember(dest => dest.Entradas, opt => opt.Ignore())
            .ForMember(dest => dest.DetalleCompras, opt => opt.Ignore());

        CreateMap<Lote, LoteDto>()
            .ForMember(dest => dest.Entradas, opt => opt.MapFrom(src => src.Entradas))
            .ReverseMap()
            .ForMember(dest => dest.Evento, opt => opt.Ignore())
            .ForMember(dest => dest.Entradas, opt => opt.Ignore())
            .ForMember(dest => dest.DetalleCompras, opt => opt.Ignore());

        CreateMap<Evento, EventoDto>()
            .ForMember(dest => dest.VenueNombre, opt => opt.MapFrom(src => src.Venue != null ? src.Venue.Nombre : null));

        CreateMap<EventoDto, Evento>()
            .ForMember(dest => dest.Venue, opt => opt.Ignore())
            .ForMember(dest => dest.Organizador, opt => opt.Ignore())
            .ForMember(dest => dest.Lotes, opt => opt.Ignore())
            .ForMember(dest => dest.Entradas, opt => opt.Ignore())
            .ForMember(dest => dest.Compras, opt => opt.Ignore());
    }
}