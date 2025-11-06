using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using SistemaABM_Eventos_Repository.Interface;
using SistemaABM_Eventos_Repository.Mapper;

namespace SistemaABM_Eventos_Repository.Service;

public static class DependencyInjection
{
    public static IServiceCollection AddSistemaEventosRepository(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(EventoProfile).Assembly);
        services.AddScoped<IServiceEvento, ServiceEvento>();
        return services;
    }
}